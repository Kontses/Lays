import { Box, Typography, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { layFlavors } from '../data';

const imgLogo = "/logo.png";

// Συνάρτηση κανονικοποίησης ελληνικών χαρακτήρων (αφαίρεση τόνων και μετατροπή σε πεζά)
const normalizeGreek = (text: string) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Αφαιρεί όλους τους ελληνικούς τόνους/διακριτικά
    .replace(/ά/g, 'α')
    .replace(/έ/g, 'ε')
    .replace(/ή/g, 'η')
    .replace(/ί/g, 'ι')
    .replace(/ό/g, 'ο')
    .replace(/ύ/g, 'υ')
    .replace(/ώ/g, 'ω')
    .replace(/ϊ/g, 'ι')
    .replace(/ϋ/g, 'υ')
    .replace(/ΐ/g, 'ι')
    .replace(/ΰ/g, 'υ');
};

interface HeaderProps {
  cartCount: number;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onSelectFlavor: (index: number) => void;
  onMenuItemClick: (item: string) => void;
}

export default function Header({
  cartCount,
  isSearchOpen,
  setIsSearchOpen,
  searchQuery,
  setSearchQuery,
  isFavorite,
  onToggleFavorite,
  onSelectFlavor,
  onMenuItemClick,
}: HeaderProps) {
  const searchRef = useRef<HTMLDivElement>(null);

  // Αυτόματο κλείσιμο του search bar όταν ο χρήστης κάνει κλικ εκτός
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        // Αν το κλικ έγινε στο κουμπί αναζήτησης, το αγνοούμε γιατί έχει δικό του onClick toggle
        const searchButton = document.querySelector('[aria-label="Αναζήτηση"]');
        if (searchButton && searchButton.contains(event.target as Node)) {
          return;
        }
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    };

    if (isSearchOpen) {
      const timer = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside); // Άμεσο κλείσιμο με mousedown
      }, 0);
      return () => {
        clearTimeout(timer);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isSearchOpen, setIsSearchOpen, setSearchQuery]);

  // Φιλτράρισμα των Lay's γεύσεων με βάση την αναζήτηση (Accent-insensitive & Case-insensitive)
  const suggestions = searchQuery.trim() === ''
    ? []
    : layFlavors.filter(flavor => {
        const normTitle = normalizeGreek(flavor.title);
        const normDesc = normalizeGreek(flavor.description);
        const normQuery = normalizeGreek(searchQuery);
        return normTitle.includes(normQuery) || normDesc.includes(normQuery);
      });

  // Κοινά Styles για τα 3 Action Buttons (Figma Design)
  const actionButtonStyles = {
    width: { xs: 30, sm: 34, md: 36, xl: 40 }, // Επαναφορά στο τέλειο μέγεθος του πλέγματος
    height: { xs: 30, sm: 34, md: 36, xl: 40 },
    p: 0,
    borderRadius: '50%',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    border: 'none',
    transition: 'all 0.25s ease',
    '&:hover': {
      backgroundColor: 'transparent', // Απενεργοποίηση του default γκρίζου background του MUI
      transform: 'scale(1.08)',
    },
    '&.MuiButtonBase-root': {
      backgroundColor: 'transparent',
    }
  };


  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pt: { xs: 2, md: 2, xl: 2.5 },
        px: { xs: 2, sm: 4, md: 6, lg: 9, xl: 10 },
        width: '100%',
        boxSizing: 'border-box',
        position: 'relative',
        zIndex: 100,
        gap: { xs: 1.5, sm: 2, md: 0 },
      }}
    >
      {/* Λογότυπο Lay's - Πάντα ορατό */}
      <Box 
        sx={{ 
          width: { xs: 55, sm: 65, md: 80, lg: 85, xl: 92 }, 
          height: { xs: 50, sm: 60, md: 75, lg: 80, xl: 86 },
          flexShrink: 0
        }}
      >
        <img src={imgLogo} alt="Lays Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </Box>

      {/* Κεντρικό Container: Navigation Menu ή Search Overlay */}
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          maxWidth: { xs: '62%', sm: '70%', md: '480px' },
          mx: 'auto',
          minHeight: '45px',
        }}
      >
        {/* Navigation Menu */}
        <Box
          component={motion.div}
          animate={{
            opacity: isSearchOpen ? 0 : 1,
            scale: isSearchOpen ? 0.95 : 1,
            y: isSearchOpen ? -5 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{
            pointerEvents: isSearchOpen ? 'none' : 'auto',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '100px',
              padding: { xs: '2px', md: '4px' },
              gap: { xs: 0.5, md: 1 },
              maxWidth: '100%',
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {['PRODUCTS', 'ABOUT', 'WHERE TO BUY', 'CONTACT'].map((item, idx) => (
              <Box
                key={item}
                onClick={() => {
                  if (idx !== 0) {
                    onMenuItemClick(item);
                  }
                }}
                sx={{
                  backgroundColor: idx === 0 ? 'white' : 'transparent',
                  borderRadius: '100px',
                  padding: { xs: '4.5px 9px', sm: '5.5px 11px', md: '6.5px 13px', xl: '8px 16px' },
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'background-color 0.3s',
                  '&:hover': {
                    backgroundColor: idx === 0 ? 'white' : 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: '"Mona Sans", sans-serif',
                    fontWeight: 500,
                    fontSize: { xs: 9.5, sm: 11, md: 13, xl: 14.5 },
                    color: idx === 0 ? '#121212' : 'white',
                  }}
                >
                  {item}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Premium Επεκτεινόμενη Μπάρα Αναζήτησης με Live Suggestions Dropdown */}
        <AnimatePresence>
          {isSearchOpen && (
            <Box
              ref={searchRef}
              component={motion.div}
              initial={{ scaleX: 0.8, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ scaleX: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              style={{ originX: 1 }}
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 2,
                bottom: 2,
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.25)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '100px',
                px: 2.5,
                backdropFilter: 'blur(16px)',
                zIndex: 10,
              }}
            >
              <svg width="20" height="20" viewBox="10 10 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '12px', flexShrink: 0 }}>
                <path d="M33.3248 32.1751L28.2396 27.0909C29.7135 25.3214 30.4485 23.0518 30.2916 20.7542C30.1347 18.4566 29.0981 16.3079 27.3974 14.7551C25.6967 13.2023 23.4628 12.365 21.1604 12.4174C18.858 12.4697 16.6645 13.4076 15.036 15.036C13.4076 16.6645 12.4697 18.858 12.4174 21.1604C12.365 23.4628 13.2023 25.6967 14.7551 27.3974C16.3079 29.0981 18.4566 30.1347 20.7542 30.2916C23.0518 30.4485 25.3214 29.7135 27.0909 28.2396L32.1751 33.3248C32.2506 33.4003 32.3403 33.4602 32.4389 33.5011C32.5375 33.5419 32.6432 33.5629 32.75 33.5629C32.8567 33.5629 32.9625 33.5419 33.0611 33.5011C33.1597 33.4602 33.2493 33.4003 33.3248 33.3248C33.4003 33.2493 33.4602 33.1597 33.5011 33.0611C33.5419 32.9625 33.5629 32.8567 33.5629 32.75C33.5629 32.6432 33.5419 32.5375 33.5011 32.4389C33.4602 32.3403 33.4003 32.2506 33.3248 32.1751ZM14.0625 21.375C14.0625 19.9287 14.4914 18.5149 15.2949 17.3124C16.0984 16.1098 17.2404 15.1726 18.5766 14.6191C19.9128 14.0657 21.3831 13.9208 22.8016 14.203C24.2201 14.4851 25.523 15.1816 26.5457 16.2043C27.5684 17.2269 28.2648 18.5299 28.547 19.9484C28.8291 21.3669 28.6843 22.8372 28.1309 24.1734C27.5774 25.5095 26.6401 26.6516 25.4376 27.4551C24.2351 28.2586 22.8213 28.6875 21.375 28.6875Z" fill="white" />
              </svg>
              <Box
                component="input"
                autoFocus
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === 'Enter' && suggestions.length > 0) {
                    const firstSuggestion = suggestions[0];
                    const flavorIndex = layFlavors.findIndex(f => f.id === firstSuggestion.id);
                    onSelectFlavor(flavorIndex);
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }
                }}
                placeholder="Search flavor..."
                sx={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'white',
                  fontFamily: '"Mona Sans", sans-serif',
                  fontSize: { xs: '12px', sm: '14.5px' },
                  '&::placeholder': {
                    color: 'rgba(255, 255, 255, 0.65)',
                  },
                }}
              />
              <IconButton 
                onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }} 
                sx={{ 
                  p: 0.5, 
                  color: 'white', 
                  opacity: 0.8, 
                  '&:hover': { opacity: 1, transform: 'scale(1.1)' },
                  transition: 'all 0.2s',
                }}
              >
                <CloseIcon sx={{ fontSize: { xs: 16, md: 20 } }} />
              </IconButton>

              {/* Floating Dropdown με τις προτάσεις αναζήτησης */}
              <AnimatePresence>
                {suggestions.length > 0 && (
                  <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    sx={{
                      position: 'absolute',
                      top: '115%',
                      left: 0,
                      right: 0,
                      backgroundColor: 'rgba(255, 255, 255, 0.15)', // Εξαιρετικά ανοιχτό και διαφανές
                      backdropFilter: 'blur(24px)', // Premium frosted-glass εφέ
                      border: '1px solid rgba(255, 255, 255, 0.22)',
                      borderRadius: '24px',
                      boxShadow: '0 20px 40px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255,255,255,0.15)', // Λευκό glowing shadow αντί για μαύρο πλαίσιο
                      overflow: 'hidden',
                      zIndex: 200,
                      display: 'flex',
                      flexDirection: 'column',
                      p: 1.2,
                      gap: 0.6,
                    }}
                  >
                    {suggestions.map((flavor) => {
                      const flavorIndex = layFlavors.findIndex(f => f.id === flavor.id);
                      return (
                        <Box
                          key={flavor.id}
                          onClick={() => {
                            onSelectFlavor(flavorIndex);
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            p: 1.2,
                            borderRadius: '16px',
                            cursor: 'pointer',
                            transition: 'all 0.25s',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.22)',
                              transform: 'translateX(6px)',
                            }
                          }}
                        >
                          <img 
                            src={flavor.image} 
                            alt={flavor.title} 
                            style={{ 
                              width: '34px', 
                              height: '34px', 
                              objectFit: 'contain',
                              filter: 'drop-shadow(0px 3px 6px rgba(0,0,0,0.4))'
                            }} 
                          />
                          <Box sx={{ textAlign: 'left' }}>
                            <Typography 
                              sx={{ 
                                color: '#ffffff', 
                                fontWeight: 600, 
                                fontSize: '13px', 
                                fontFamily: '"Mona Sans", sans-serif',
                                textShadow: '0 1px 3px rgba(0,0,0,0.12)'
                              }}
                            >
                              {flavor.title}
                            </Typography>
                            <Typography 
                              sx={{ 
                                color: 'rgba(255, 255, 255, 0.82)', 
                                fontSize: '11px', 
                                fontFamily: '"Mona Sans", sans-serif',
                                textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '320px'
                              }}
                            >
                              {flavor.description}
                            </Typography>
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                )}
              </AnimatePresence>

              {/* No Results Box */}
              {suggestions.length === 0 && searchQuery.trim() !== '' && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '115%',
                    left: 0,
                    right: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Εξαιρετικά ανοιχτό και διαφανές
                    backdropFilter: 'blur(24px)',
                    border: '1px solid rgba(255, 255, 255, 0.22)',
                    borderRadius: '24px',
                    p: 2.2,
                    zIndex: 200,
                    color: '#ffffff',
                    textShadow: '0 1px 3px rgba(0,0,0,0.12)',
                    fontSize: '13px',
                    textAlign: 'center',
                    fontFamily: '"Mona Sans", sans-serif',
                    boxShadow: '0 20px 40px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255,255,255,0.15)',
                  }}
                >
                  Δεν βρέθηκαν αποτελέσματα για "{searchQuery}"
                </Box>
              )}
            </Box>
          )}
        </AnimatePresence>
      </Box>

      {/* Action Buttons: Search, Favorites, Cart (Ομοιόμορφη Σχεδίαση Figma με Inline SVGs) */}
      <Box 
        sx={{ 
          display: 'flex', 
          gap: { xs: 1, md: 1.5, xl: 2 }, 
          alignItems: 'center',
          flexShrink: 0 
        }}
      >
        {/* Αναζήτηση */}
        <IconButton 
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          aria-label="Αναζήτηση" 
          disableRipple
          sx={{ 
            ...actionButtonStyles,
            display: { xs: 'none', md: 'inline-flex' }, 
          }}
        >
          <img src="/Search%20Icon.svg" alt="Search" style={{ width: '100%', height: '100%', display: 'block' }} />
        </IconButton>

        {/* Αγαπημένα */}
        <IconButton 
          onClick={onToggleFavorite}
          aria-label="Αγαπημένα" 
          disableRipple
          sx={{ 
            ...actionButtonStyles,
            display: { xs: 'none', md: 'inline-flex' }, 
          }}
        >
          <Box
            component={motion.div}
            key={isFavorite ? 'favorite-active' : 'favorite-inactive'}
            initial={{ scale: 0.8 }}
            animate={{ scale: isFavorite ? [1, 1.35, 0.95, 1.05, 1] : 1 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}
          >
            {isFavorite ? (
              <svg width="100%" height="100%" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                <circle cx="23" cy="23" r="23" fill="white" fillOpacity="0.2"/>
                <circle cx="23" cy="23" r="22.5" stroke="black" strokeOpacity="0.24"/>
                <path d="M28.0781 14.0625C25.9809 14.0625 24.1446 14.9644 23 16.4888C21.8554 14.9644 20.0191 14.0625 17.9219 14.0625C16.2524 14.0644 14.6519 14.7284 13.4714 15.9089C12.2909 17.0894 11.6269 18.6899 11.625 20.3594C11.625 27.4688 22.1662 33.2233 22.6151 33.4609C22.7334 33.5246 22.8656 33.5579 23 33.5579C23.1344 33.5579 23.2666 33.5246 23.3849 33.4609C23.8338 33.2233 34.375 27.4688 34.375 20.3594C34.3731 18.6899 33.7091 17.0894 32.5286 15.9089C31.3481 14.7284 29.7476 14.0644 28.0781 14.0625Z" fill="#FF383C"/>
              </svg>
            ) : (
              <img src="/Heart%20Icon.svg" alt="Favorites" style={{ width: '100%', height: '100%', display: 'block' }} />
            )}
          </Box>
        </IconButton>

        {/* Καλάθι Αγορών */}
        <IconButton 
          aria-label="Καλάθι αγορών" 
          disableRipple
          sx={{ 
            ...actionButtonStyles,
            position: 'relative',
          }}
        >
          <img src="/Bag%20Icon.svg" alt="Cart" style={{ width: '100%', height: '100%', display: 'block' }} />

          
          {/* Snappy Scale-Pop Badge */}
          <AnimatePresence>
            {cartCount > 0 && (
              <Box
                component={motion.div}
                key={cartCount}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [1, 1.35, 1], opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 350, damping: 15 }}
                sx={{
                  position: 'absolute',
                  top: -2,
                  right: -4,
                  minWidth: { xs: 14, sm: 16, xl: 18 },
                  height: { xs: 14, sm: 16, xl: 18 },
                  backgroundColor: 'white',
                  color: '#121212',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: { xs: 8, sm: 9, xl: 10 },
                  fontWeight: 800,
                  fontFamily: '"Inter", sans-serif',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  px: 0.5,
                }}
              >
                {cartCount}
              </Box>
            )}
          </AnimatePresence>
        </IconButton>
      </Box>
    </Box>
  );
}
