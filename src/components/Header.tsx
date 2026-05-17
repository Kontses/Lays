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
        pt: { xs: 1.5, md: 2, xl: 2.5 }, // Μειωμένο padding top
        px: { xs: 3, md: 6, lg: 9, xl: 10 }, // Ελαφρώς πιο μαζεμένα πλευρικά margins
        width: '100%',
        boxSizing: 'border-box',
        position: 'relative',
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <Box sx={{ width: { xs: 70, md: 80, lg: 85, xl: 92 }, height: { xs: 65, md: 75, lg: 80, xl: 86 } }}>
        <img src={imgLogo} alt="Lays Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </Box>

      {/* Navigation Menu */}
      <Box
        sx={{
          display: 'flex',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.2)', // Επαναφορά σε λεπτό, κομψό περίγραμμα
          borderRadius: '100px',
          padding: { xs: '3px', md: '4px' },
          gap: { xs: 0.5, md: 1 },
        }}
      >
        {['PRODUCTS', 'ABOUT', 'WHERE TO BUY', 'CONTACT'].map((item, idx) => (
          <Box
            key={item}
            sx={{
              backgroundColor: idx === 0 ? 'white' : 'transparent',
              borderRadius: '100px',
              padding: { xs: '5px 10px', md: '6.5px 13px', xl: '8px 16px' }, // Μικρότερο padding
              cursor: 'pointer',
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
                fontSize: { xs: 11, md: 13, xl: 14.5 }, // Μειωμένο μέγεθος γραμματοσειράς
                color: idx === 0 ? '#121212' : 'white',
              }}
            >
              {item}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Icons */}
      <Box sx={{ display: 'flex', gap: { xs: 0.75, md: 1.5, xl: 2 }, alignItems: 'center' }}>
        <IconButton aria-label="Αναζήτηση" sx={{ width: { xs: 32, md: 36, xl: 40 }, height: { xs: 32, md: 36, xl: 40 }, p: 0 }}>
          <img src={imgSearch} alt="Αναζήτηση" style={{ width: '100%', height: '100%' }} />
        </IconButton>
        <IconButton aria-label="Αγαπημένα" sx={{ width: { xs: 32, md: 36, xl: 40 }, height: { xs: 32, md: 36, xl: 40 }, p: 0 }}>
          <img src={imgHeart} alt="Αγαπημένα" style={{ width: '100%', height: '100%' }} />
        </IconButton>
        <IconButton aria-label="Καλάθι αγορών" sx={{ width: { xs: 32, md: 36, xl: 40 }, height: { xs: 32, md: 36, xl: 40 }, p: 0, position: 'relative' }}>
          <img src={imgBag} alt="Καλάθι αγορών" style={{ width: '100%', height: '100%' }} />
          {/* Notification Dot */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: -3,
              width: { xs: 7, md: 9, xl: 10 },
              height: { xs: 7, md: 9, xl: 10 },
              backgroundColor: 'white',
              borderRadius: '50%',
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
}
