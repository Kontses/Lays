import { Box, Typography, IconButton } from '@mui/material';

const imgLogo = "/logo.png";
const imgSearch = "/Search Icon.svg";
const imgHeart = "/Heart Icon.svg";
const imgBag = "/Bag Icon.svg";

export default function Header() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pt: { xs: 2, md: 2, xl: 2.5 }, // Padding στο επάνω μέρος
        px: { xs: 2, sm: 4, md: 6, lg: 9, xl: 10 }, // Πλευρικά margins
        width: '100%',
        boxSizing: 'border-box',
        position: 'relative',
        zIndex: 100,
        gap: { xs: 1.5, sm: 2, md: 0 }, // Gap μεταξύ των στοιχείων στο κινητό
      }}
    >
      {/* Λογότυπο Lay's - Πάντα ορατό και κλιμακούμενο */}
      <Box 
        sx={{ 
          width: { xs: 55, sm: 65, md: 80, lg: 85, xl: 92 }, 
          height: { xs: 50, sm: 60, md: 75, lg: 80, xl: 86 },
          flexShrink: 0 // Αποτροπή παραμόρφωσης
        }}
      >
        <img src={imgLogo} alt="Lays Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </Box>

      {/* Μενού Πλοήγησης: Οριζόντια κυλιόμενο (horizontal scroll) σε κινητά, σταθερό σε desktop */}
      <Box
        sx={{
          display: 'flex',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '100px',
          padding: { xs: '2px', md: '4px' },
          gap: { xs: 0.5, md: 1 },
          maxWidth: { xs: '62%', sm: '70%', md: 'auto' }, // Περιορισμός πλάτους στο κινητό για αποφυγή συνωστισμού
          overflowX: 'auto', // Ενεργοποίηση οριζόντιας κύλισης
          whiteSpace: 'nowrap', // Αποτροπή αλλαγής γραμμής
          flexShrink: 1,
          scrollbarWidth: 'none', // Απόκρυψη scrollbar σε Firefox
          '&::-webkit-scrollbar': { display: 'none' }, // Απόκρυψη scrollbar σε Chrome/Safari
          // Smooth momentum scrolling για iOS συσκευές
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {['PRODUCTS', 'ABOUT', 'WHERE TO BUY', 'CONTACT'].map((item, idx) => (
          <Box
            key={item}
            sx={{
              backgroundColor: idx === 0 ? 'white' : 'transparent',
              borderRadius: '100px',
              padding: { xs: '4.5px 9px', sm: '5.5px 11px', md: '6.5px 13px', xl: '8px 16px' }, // Προσαρμοσμένο padding
              cursor: 'pointer',
              flexShrink: 0, // Αποτροπή συρρίκνωσης των στοιχείων του μενού
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
                fontSize: { xs: 9.5, sm: 11, md: 13, xl: 14.5 }, // Μειωμένο μέγεθος γραμματοσειράς στο κινητό
                color: idx === 0 ? '#121212' : 'white',
              }}
            >
              {item}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Εικονίδια: Εμφανίζονται επιλεκτικά ανάλογα με την οθόνη */}
      <Box 
        sx={{ 
          display: 'flex', 
          gap: { xs: 1, md: 1.5, xl: 2 }, 
          alignItems: 'center',
          flexShrink: 0 // Αποτροπή συρρίκνωσης
        }}
      >
        {/* Αναζήτηση - Μόνο για Desktop (md και πάνω) */}
        <IconButton 
          aria-label="Αναζήτηση" 
          sx={{ 
            display: { xs: 'none', md: 'inline-flex' }, 
            width: { md: 36, xl: 40 }, 
            height: { md: 36, xl: 40 }, 
            p: 0 
          }}
        >
          <img src={imgSearch} alt="Αναζήτηση" style={{ width: '100%', height: '100%' }} />
        </IconButton>

        {/* Αγαπημένα - Μόνο για Desktop (md και πάνω) */}
        <IconButton 
          aria-label="Αγαπημένα" 
          sx={{ 
            display: { xs: 'none', md: 'inline-flex' }, 
            width: { md: 36, xl: 40 }, 
            height: { md: 36, xl: 40 }, 
            p: 0 
          }}
        >
          <img src={imgHeart} alt="Αγαπημένα" style={{ width: '100%', height: '100%' }} />
        </IconButton>

        {/* Καλάθι αγορών - Πάντα ορατό */}
        <IconButton 
          aria-label="Καλάθι αγορών" 
          sx={{ 
            width: { xs: 30, sm: 34, md: 36, xl: 40 }, 
            height: { xs: 30, sm: 34, md: 36, xl: 40 }, 
            p: 0, 
            position: 'relative' 
          }}
        >
          <img src={imgBag} alt="Καλάθι αγορών" style={{ width: '100%', height: '100%' }} />
          {/* Κουκκίδα ειδοποίησης */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: -3,
              width: { xs: 6, sm: 8, md: 9, xl: 10 },
              height: { xs: 6, sm: 8, md: 9, xl: 10 },
              backgroundColor: 'white',
              borderRadius: '50%',
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
}
