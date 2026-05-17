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
        pt: { xs: 2, md: 3 },
        px: { xs: 4, md: 8, lg: 12 },
        width: '100%',
        boxSizing: 'border-box',
        position: 'relative',
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <Box sx={{ width: 107, height: 100 }}>
        <img src={imgLogo} alt="Lays Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </Box>

      {/* Navigation Menu */}
      <Box
        sx={{
          display: 'flex',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '100px',
          padding: '4px',
          gap: 1,
        }}
      >
        {['PRODUCTS', 'ABOUT', 'WHERE TO BUY', 'CONTACT'].map((item, idx) => (
          <Box
            key={item}
            sx={{
              backgroundColor: idx === 0 ? 'white' : 'transparent',
              borderRadius: '100px',
              padding: '10px 20px',
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
                fontSize: 16,
                color: idx === 0 ? '#121212' : 'white',
              }}
            >
              {item}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Icons */}
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <IconButton aria-label="Αναζήτηση" sx={{ width: 46, height: 46, p: 0 }}>
          <img src={imgSearch} alt="Αναζήτηση" style={{ width: '100%', height: '100%' }} />
        </IconButton>
        <IconButton aria-label="Αγαπημένα" sx={{ width: 46, height: 46, p: 0 }}>
          <img src={imgHeart} alt="Αγαπημένα" style={{ width: '100%', height: '100%' }} />
        </IconButton>
        <IconButton aria-label="Καλάθι αγορών" sx={{ width: 46, height: 46, p: 0, position: 'relative' }}>
          <img src={imgBag} alt="Καλάθι αγορών" style={{ width: '100%', height: '100%' }} />
          {/* Notification Dot */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: -4,
              width: 12,
              height: 12,
              backgroundColor: 'white',
              borderRadius: '50%',
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
}
