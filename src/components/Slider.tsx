import { useState, useRef, useEffect } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { layFlavors } from '../data';
import Header from './Header';

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const currentFlavor = layFlavors[currentIndex];

  // Νέα States για Cart, Favorites και Search
  const [cartCount, setCartCount] = useState(0);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hireMeModalItem, setHireMeModalItem] = useState<string | null>(null);

  const handleMenuItemClick = (item: string) => {
    setHireMeModalItem(item);
    playCrunchSound(); // crunch feedback για άνοιγμα του modal
  };

  const toggleFavorite = () => {
    setFavorites((prev) => ({
      ...prev,
      [currentFlavor.id]: !prev[currentFlavor.id],
    }));
  };

  const handleBuyNow = () => {
    setCartCount((prev) => prev + 1);
    playCrunchSound(); // Satisfying crunch feedback κατά την προσθήκη στο καλάθι
  };

  // Επιλογή γεύσης από την μπάρα αναζήτησης με smooth sliding μετάβαση
  const handleSelectFlavor = (index: number) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    playCrunchSound(); // crunch feedback για ικανοποιητική αίσθηση μετάβασης
  };

  // useRef για τους ήχους ώστε να μην εμποδίζονται από HMR και browser policies
  const crunchSoundsRef = useRef<HTMLAudioElement[]>([]);
  const soundIndexRef = useRef(0);

  useEffect(() => {
    // Δημιουργία των Audio αντικειμένων μόνο στο client-side mount
    crunchSoundsRef.current = [
      new Audio('/eating_1.wav'),
      new Audio('/eating_2.wav'),
      new Audio('/eating_3.wav'),
      new Audio('/eating_4.wav'),
    ];
    // Αναγκαστική προφόρτωση
    crunchSoundsRef.current.forEach((sound) => {
      sound.load();
    });
  }, []);

  const playCrunchSound = () => {
    const sounds = crunchSoundsRef.current;
    if (sounds.length === 0) return;
    const sound = sounds[soundIndexRef.current];
    if (sound) {
      sound.currentTime = 0; // Ακαριαία επαναφορά στην αρχή
      sound.play().catch((err) => console.log('Αποτυχία αναπαραγωγής ήχου:', err));
    }
    soundIndexRef.current = (soundIndexRef.current + 1) % sounds.length;
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % layFlavors.length);
    playCrunchSound(); // Αναπαραγωγή ήχου ακαριαία
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + layFlavors.length) % layFlavors.length);
    playCrunchSound(); // Αναπαραγωγή ήχου ακαριαία
  };

  // Μαθηματική συνάρτηση για τον υπολογισμό του relative index της σακούλας
  const getRelativeIndex = (flavorIndex: number) => {
    const diff = (flavorIndex - currentIndex + layFlavors.length) % layFlavors.length;
    if (diff === layFlavors.length - 1) return -1; // Προηγούμενη (εξέρχεται αριστερά)
    return diff; // 0 = Ενεργή, 1 = Επόμενη (Peek), 2 = Μεθεπόμενη
  };

  // Variants για τα κείμενα (τίτλος, περιγραφή, τιμή) με premium θόλωμα (blur)
  const textVariants = {
    enter: (direction: number) => ({
      opacity: 0,
      y: direction > 0 ? 30 : -30,
      filter: 'blur(4px)',
    }),
    center: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as any,
      },
    },
    exit: (direction: number) => ({
      opacity: 0,
      y: direction < 0 ? 30 : -30,
      filter: 'blur(4px)',
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1] as any,
      },
    }),
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        bgcolor: '#121212', // Σκουρόχρωμη βάση
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Διπλό Επίπεδο Background με Sync Crossfade για Premium Μετάβαση */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: currentFlavor.gradient,
            }}
          />
        </AnimatePresence>
      </Box>

      {/* Premium Backdrop Blur Overlay όταν η Αναζήτηση είναι ανοιχτή */}
      <AnimatePresence>
        {isSearchOpen && (
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            onClick={() => {
              setIsSearchOpen(false);
              setSearchQuery('');
            }}
            sx={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.35)', // Απαλό dimming
              backdropFilter: 'blur(12px)', // Ισχυρό premium blur για βελτιστοποίηση αναγνωσιμότητας
              WebkitBackdropFilter: 'blur(12px)',
              zIndex: 90, // Πάνω από το main content αλλά κάτω από το Header
              cursor: 'pointer',
            }}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <Header
        cartCount={cartCount}
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isFavorite={!!favorites[currentFlavor.id]}
        onToggleFavorite={toggleFavorite}
        onSelectFlavor={handleSelectFlavor}
        onMenuItemClick={handleMenuItemClick}
      />

      <Box
        component="main"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // Κατακόρυφη στοίχιση στο κινητό, οριζόντια στο desktop
          alignItems: 'center',
          justifyContent: { xs: 'center', md: 'flex-start' }, // Κεντράρισμα στο κινητό
          px: { xs: 2.5, sm: 4, md: 6, lg: 9, xl: 10 }, // Προσαρμοσμένο padding για κινητά
          py: { xs: 1.5, sm: 3, md: 0 }, // Μειωμένο padding για περισσότερο ελεύθερο κάθετο χώρο
          position: 'relative',
          zIndex: 5,
          gap: { xs: 2, sm: 3, md: 0 }, // Βελτιστοποιημένη απόσταση στο κινητό για περισσότερο χώρο
        }}
      >
        {/* Left Side: Content */}
        <Box
          sx={{
            flex: { xs: 'none', md: '0 0 45%' },
            width: { xs: '100%', md: 'auto' },
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'flex-start' }, // Κεντράρισμα στοιχείων στο κινητό
          }}
        >
          {/* Badge: 100% Σταθερό και Αμετάβλητο */}
          <Box
            sx={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.2)', // 20% Fill από το Figma
              border: '1px solid rgba(255,255,255,0.24)', // 24% Inside Stroke από το Figma
              borderRadius: '100px',
              px: { xs: 2, xl: 2.5 },
              py: { xs: 0.5, xl: 0.75 },
              mb: { xs: 0.75, sm: 1.5, md: 2, xl: 2.5 }, // Μικρότερο margin για εξοικονόμηση χώρου στο κινητό
            }}
          >
            <Typography sx={{ color: 'white', fontWeight: 600, fontSize: { xs: 11, xl: 12 }, textTransform: 'uppercase', letterSpacing: 1 }}>
              Try new Lays
            </Typography>
          </Box>

          {/* Τίτλος: Ανεξάρτητο Sliding Animation με σταθερό minHeight για αποφυγή layout shifting */}
          <Box
            sx={{
              width: '100%',
              minHeight: { xs: 'auto', sm: '60px', md: '124px', lg: '146px', xl: '160px' }, // auto στο κινητό για βέλτιστο ύψος
              display: 'flex',
              alignItems: 'center',
              justifyContent: { xs: 'center', md: 'flex-start' } // Κεντράρισμα τίτλου στο κινητό
            }}
          >
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentFlavor.id}
                custom={direction}
                initial="enter"
                animate="center"
                exit="exit"
                variants={textVariants}
                style={{ width: '100%' }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontFamily: '"Mona Sans", "Inter", sans-serif',
                    color: 'white',
                    fontSize: { xs: 30, sm: 40, md: 52, lg: 62, xl: 68 }, // Μεγαλύτερος και πιο ξεκάθαρος τίτλος στο κινητό
                    fontWeight: 800,
                    lineHeight: 1.1,
                    letterSpacing: '-0.03em',
                    textAlign: { xs: 'center', md: 'left' } // Κεντράρισμα κειμένου στο κινητό
                  }}
                >
                  {currentFlavor.title}
                </Typography>
              </motion.div>
            </AnimatePresence>
          </Box>

          {/* Περιγραφή: Ανεξάρτητο Sliding Animation με σταθερό minHeight */}
          <Box
            sx={{
              width: '100%',
              minHeight: { xs: 'auto', sm: '76px', md: '86px', xl: '96px' }, // auto στο κινητό για βέλτιστο ύψος
              mb: { xs: 1.5, sm: 2.5, md: 3, xl: 4 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: { xs: 'center', md: 'flex-start' } // Κεντράρισμα περιγραφής στο κινητό
            }}
          >
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentFlavor.id}
                custom={direction}
                initial="enter"
                animate="center"
                exit="exit"
                variants={textVariants}
                style={{ width: '100%' }}
              >
                <Typography
                  sx={{
                    fontFamily: '"Inter", sans-serif',
                    color: 'white',
                    fontSize: { xs: 13, sm: 14.5, md: 15, xl: 16.5 }, // Μεγαλύτερη και πιο ξεκάθαρη περιγραφή στο κινητό
                    maxWidth: '440px',
                    opacity: 0.9,
                    lineHeight: 1.6,
                    textAlign: { xs: 'center', md: 'left' } // Κεντράρισμα κειμένου στο κινητό
                  }}
                >
                  {currentFlavor.description}
                </Typography>
              </motion.div>
            </AnimatePresence>
          </Box>

          {/* Action Area (Buy Now & Price): 100% Σταθερό και Αμετάβλητο */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: { xs: 'center', md: 'flex-start' }, // Κεντράρισμα στο κινητό
              gap: { xs: 3, md: 4 },
              width: '100%',
              mt: { xs: 0.5, md: 0 }
            }}
          >
            <Button
              variant="contained"
              endIcon={<ArrowRightAltIcon />}
              onClick={handleBuyNow}
              sx={{
                bgcolor: 'white',
                color: '#121212',
                px: { xs: '18px', sm: '20px', md: '22px', xl: '26px' }, // Μεγαλύτερο padding για καθαρότερη εμφάνιση στο κινητό
                py: { xs: '9px', sm: '11px', md: '12px', xl: '14px' }, // Μεγαλύτερο padding
                fontSize: { xs: 12.5, sm: 13.5, md: 14, lg: 15, xl: 16 }, // Μεγαλύτερη γραμματοσειρά κουμπιού στο κινητό
                fontWeight: 600,
                borderRadius: '100px',
                textTransform: 'uppercase',
                // 20% White Stroke με 5px Outside χρησιμοποιώντας box-shadow spread
                boxShadow: '0 0 0 5px rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  boxShadow: '0 0 0 5px rgba(255, 255, 255, 0.35), 0 6px 18px rgba(255, 255, 255, 0.15)',
                  '& .MuiButton-endIcon': {
                    transform: 'translateX(4px)',
                  }
                },
                '& .MuiButton-endIcon': {
                  transition: 'transform 0.3s ease',
                }
              }}
            >
              Buy Now
            </Button>
            <Typography
              component="span"
              sx={{
                fontFamily: '"Baloo Bhai 2", sans-serif',
                color: 'white',
                fontSize: { xs: 26, sm: 30, md: 34, lg: 40, xl: 44 }, // Μεγαλύτερη και πιο ξεκάθαρη τιμή στο κινητό
                fontWeight: 600,
                lineHeight: 1,
              }}
            >
              1,50 €
            </Typography>
          </Box>
        </Box>

        {/* Right Side: Visuals (The 3D Deck Carousel Container) */}
        <Box
          sx={{
            position: { xs: 'relative', md: 'absolute' }, // Στοίχιση relative στο κινητό, absolute στο desktop
            right: { xs: 'auto', md: '25%' },
            top: { xs: 'auto', md: '50%' },
            transform: { xs: 'none', md: 'translate(50%, -50%)' }, // Απενεργοποίηση transform στο κινητό
            width: { xs: '26vh', sm: '32vh', md: '48vh', lg: '52vh', xl: '55vh' }, // Μεγαλύτερη σακούλα για περισσότερο «αέρα» και παρουσία
            height: { xs: '26vh', sm: '32vh', md: '48vh', lg: '52vh', xl: '55vh' },
            maxWidth: '680px',
            maxHeight: '680px',
            minWidth: { xs: '180px', md: '260px' }, // Αυξημένο ελάχιστο πλάτος στο κινητό
            minHeight: { xs: '180px', md: '260px' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: { xs: 1.5, sm: 2, md: 0 }, // Ελαφρώς περισσότερος «αέρας» γύρω από τη σακούλα
            mb: { xs: 1.5, sm: 2, md: 0 },
          }}
        >
          {/* Ellipse 7 (The White Backdrop Glow) */}
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)',
              zIndex: 1,
            }}
          />

          {/* 3D Carousel των σακουλών Lay's */}
          {layFlavors.map((flavor, index) => {
            const relIndex = getRelativeIndex(index);

            // Παράμετροι animations για 3D βάθος
            let xValue = '0%';
            let scaleValue = 0.3;
            let rotateValue = 0;
            let blurValue = '0px';
            let opacityValue = 0;
            let zIndexValue = 1;

            if (relIndex === 0) {
              xValue = '0%';
              scaleValue = 1.0;
              rotateValue = 0;
              blurValue = '0px';
              opacityValue = 1;
              zIndexValue = 10;
            } else if (relIndex === 1) {
              xValue = '60%';
              scaleValue = 0.65;
              rotateValue = 15;
              blurValue = '8px'; // Αυξημένο blur στα 8px για περισσότερο μυστήριο και suspense!
              opacityValue = 0.6;
              zIndexValue = 5;
            } else if (relIndex === 2) {
              xValue = '120%';
              scaleValue = 0.45;
              rotateValue = 30;
              blurValue = '12px';
              opacityValue = 0;
              zIndexValue = 2;
            } else if (relIndex === -1) {
              xValue = '-120%';
              scaleValue = 0.5;
              rotateValue = -25;
              blurValue = '10px';
              opacityValue = 0;
              zIndexValue = 2;
            }

            return (
              <Box
                key={flavor.id}
                component={motion.div}
                animate={{
                  x: xValue,
                  scale: scaleValue,
                  rotate: rotateValue,
                  opacity: opacityValue,
                  zIndex: zIndexValue,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 100, // Ελαφρώς πιο μαλακό ελατήριο
                  damping: 14,    // Αυξημένη τριβή για πιο ελεγχόμενο και διακριτικό bounce
                  mass: 1.0,      // Κανονική μάζα για κομψή αδράνεια χωρίς υπερβολές
                }}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  pointerEvents: relIndex === 0 ? 'auto' : 'none',
                  filter: `blur(${blurValue})`,
                  transition: 'filter 0.5s ease-out', // Hardware-accelerated smooth CSS blur transition
                }}
              >
                <img
                  src={flavor.image}
                  alt={flavor.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    filter: 'drop-shadow(20px 20px 40px rgba(0,0,0,0.28))', // Διατήρηση της premium σκιάς
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Bottom Navigation */}
      <Box
        sx={{
          width: '100%',
          px: { xs: 2.5, sm: 4, md: 6, lg: 9, xl: 10 }, // Ευθυγραμμισμένο με το Header
          pb: { xs: 2, md: 4, xl: 5 }, // Μειωμένο κάτω κενό στο κινητό
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          zIndex: 10,
          mt: 'auto', // Σπρώξιμο στο κάτω μέρος για τέλειο responsiveness
        }}
      >
        <Box
          sx={{
            display: 'flex',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '100px',
            p: 0.5,
            backdropFilter: 'blur(10px)',
          }}
        >
          <IconButton
            onClick={handlePrev}
            aria-label="Προηγούμενη γεύση"
            sx={{
              color: 'white',
              borderRadius: '50px 0 0 50px',
              px: { xs: 2.25, md: 2.5, xl: 3 }, // Μειωμένο padding
              borderRight: '1px solid rgba(255,255,255,0.3)',
              '&:hover': { background: 'rgba(255,255,255,0.2)' }
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <IconButton
            onClick={handleNext}
            aria-label="Επόμενη γεύση"
            sx={{
              color: 'white',
              borderRadius: '0 50px 50px 0',
              px: { xs: 2.25, md: 2.5, xl: 3 }, // Μειωμένο padding
              '&:hover': { background: 'rgba(255,255,255,0.2)' }
            }}
          >
            <ArrowForwardIcon />
          </IconButton>
        </Box>

        <Box sx={{ position: 'absolute', right: { xs: '24px', md: '48px', lg: '72px', xl: '80px' }, display: 'flex', alignItems: 'baseline', color: 'white' }}>
          {/* Κάθετο Sliding Counter με popLayout για ρευστή κίνηση */}
          <Box
            sx={{
              position: 'relative',
              overflow: 'hidden',
              height: { xs: '36px', md: '44px', xl: '48px' }, // Ύψος που ταιριάζει με το fontSize
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={{
                  enter: (dir: number) => ({
                    y: dir > 0 ? '100%' : '-100%',
                    opacity: 0,
                  }),
                  center: {
                    y: '0%',
                    opacity: 1,
                  },
                  exit: (dir: number) => ({
                    y: dir > 0 ? '-100%' : '100%',
                    opacity: 0,
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  y: { type: 'spring', stiffness: 120, damping: 20 },
                  opacity: { duration: 0.2 },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: '"Baloo Bhai 2", sans-serif',
                    fontSize: { xs: 32, md: 40, xl: 44 },
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  0{currentIndex + 1}
                </Typography>
              </motion.div>
            </AnimatePresence>
          </Box>
          <Typography sx={{ fontFamily: '"Baloo Bhai 2", sans-serif', fontSize: { xs: 16, md: 20, xl: 22 }, ml: 1, opacity: 0.6 }}>/0{layFlavors.length}</Typography>
        </Box>
      </Box>

      {/* "Hire Me" Funny Glassmorphic Modal */}
      <AnimatePresence>
        {hireMeModalItem && (
          <Box
            onClick={() => {
              setHireMeModalItem(null);
              playCrunchSound();
            }}
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              backdropFilter: 'blur(12px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
            }}
          >
            <Box
              component={motion.div}
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 40 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              sx={{
                width: '100%',
                maxWidth: '400px',
                borderRadius: '24px',
                padding: { xs: '32px 24px', sm: '36px 32px' },
                textAlign: 'center',
                background: 'rgba(255, 255, 255, 0.18)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 30px 70px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.35)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
                position: 'relative',
                overflow: 'hidden',
                color: 'white',
              }}
            >
              {/* Close Button at top right */}
              <IconButton
                onClick={() => {
                  playCrunchSound();
                  setHireMeModalItem(null);
                }}
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  color: 'rgba(255, 255, 255, 0.4)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  zIndex: 10,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    transform: 'scale(1.08)',
                  },
                }}
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
                </svg>
              </IconButton>

              {/* Διακοσμητικό soft white glow στο background του modal */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '120%',
                  height: '120%',
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 70%)',
                  filter: 'blur(40px)',
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              />

              {/* Τίτλος */}
              <Typography
                sx={{
                  fontFamily: '"Mona Sans", sans-serif',
                  fontSize: { xs: 18, sm: 20 },
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  lineHeight: 1.2,
                  zIndex: 1,
                  color: 'white',
                  textTransform: 'uppercase',
                }}
              >
                Work In Progress
              </Typography>

              {/* Περιγραφή */}
              <Typography
                sx={{
                  fontFamily: '"Mona Sans", sans-serif',
                  fontSize: { xs: 13.5, sm: 14.5 },
                  fontWeight: 400,
                  lineHeight: 1.6,
                  color: 'rgba(255, 255, 255, 0.92)',
                  zIndex: 1,
                  px: { xs: 1, sm: 2 },
                }}
              >
                Η ενότητα <strong style={{ color: 'white', fontWeight: 600 }}>{hireMeModalItem}</strong> δεν είναι ακόμα διαθέσιμη...
                <br />
                <br />
                Αν θα ήθελες να δεις πλήρως υλοποιημένη την δική σου ιστοσελίδα ή εφαρμογή, επικοινώνησε μαζί μου!
              </Typography>

              {/* Action Buttons */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  gap: 1.5,
                  zIndex: 1,
                  mt: 1,
                }}
              >
                <Button
                  component="a"
                  href="mailto:vassilis.kontses@gmail.com?subject=Frontend Developer Opportunity - Lays Demo Site"
                  onClick={() => {
                    playCrunchSound();
                    setHireMeModalItem(null);
                  }}
                  sx={{
                    fontFamily: '"Mona Sans", sans-serif',
                    fontWeight: 600,
                    fontSize: { xs: 13, sm: 14 },
                    color: '#121212',
                    backgroundColor: 'white',
                    borderRadius: '100px',
                    py: 1.2,
                    textTransform: 'uppercase',
                    boxShadow: '0 0 0 5px rgba(255, 255, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1.2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      boxShadow: '0 0 0 5px rgba(255, 255, 255, 0.25), 0 6px 18px rgba(255, 255, 255, 0.12)',
                      transform: 'translateY(-1px)',
                    },
                  }}
                >
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 256 256" style={{ flexShrink: 0 }}>
                    <path d="M227.32,28.68a16,16,0,0,0-15.66-4.08l-.15,0L19.57,82.84a16,16,0,0,0-2.49,29.8L102,154l41.3,84.87A15.86,15.86,0,0,0,157.74,248q.69,0,1.38-.06a15.88,15.88,0,0,0,14-11.51l58.2-191.94c0-.05,0-.1,0-.15A16,16,0,0,0,227.32,28.68ZM157.83,231.85l-.05.14,0-.07-40.06-82.3,48-48a8,8,0,0,0-11.31-11.31l-48,48L24.08,98.25l-.07,0,.14,0L216,40Z"></path>
                  </svg>
                  Contact Me
                </Button>

                <Button
                  component="a"
                  href="https://www.linkedin.com/in/kontses/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    playCrunchSound();
                    setHireMeModalItem(null);
                  }}
                  sx={{
                    fontFamily: '"Mona Sans", sans-serif',
                    fontWeight: 600,
                    fontSize: { xs: 13, sm: 14 },
                    color: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '100px',
                    py: 1.2,
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1.2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      borderColor: 'rgba(255, 255, 255, 0.35)',
                      transform: 'translateY(-1px)',
                    },
                  }}
                >
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 256 256" style={{ flexShrink: 0 }}>
                    <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"></path>
                  </svg>
                  LinkedIn
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </AnimatePresence>
    </Box>
  );
}
