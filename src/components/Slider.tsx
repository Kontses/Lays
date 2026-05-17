import { useState } from 'react';
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
  const nextIndex = (currentIndex + 1) % layFlavors.length;
  const nextFlavor = layFlavors[nextIndex];

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % layFlavors.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + layFlavors.length) % layFlavors.length);
  };

  const imageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '60vw' : '-60vw',
      opacity: 0,
      scale: 0.5,
      rotate: direction > 0 ? 45 : -45,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { 
        duration: 0.8, 
        type: 'spring', 
        stiffness: 100,
        damping: 20
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '60vw' : '-60vw',
      opacity: 0,
      scale: 0.5,
      rotate: direction < 0 ? 45 : -45,
      transition: { duration: 0.6 },
    }),
  };

  const textVariants = {
    enter: (direction: number) => ({ opacity: 0, y: direction > 0 ? 50 : -50 }),
    center: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } },
    exit: (direction: number) => ({ opacity: 0, y: direction < 0 ? 50 : -50, transition: { duration: 0.4 } }),
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        background: currentFlavor.gradient,
        transition: 'background 0.8s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />

      <Box
        component="main"
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          px: { xs: 4, md: 8, lg: 12 },
          position: 'relative',
          zIndex: 5,
        }}
      >
        {/* Left Side: Content */}
        <Box sx={{ flex: '0 0 45%', zIndex: 10 }}>
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentFlavor.id}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              variants={textVariants}
            >
              <Box
                sx={{
                  display: 'inline-block',
                  background: 'rgba(255,255,255,0.2)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: '100px',
                  px: 3,
                  py: 1,
                  mb: 4,
                }}
              >
                <Typography sx={{ color: 'white', fontWeight: 600, fontSize: 14, textTransform: 'uppercase', letterSpacing: 1 }}>
                  Try new lays
                </Typography>
              </Box>

              <Typography
                variant="h1"
                sx={{
                  color: 'white',
                  fontSize: { xs: 40, md: 60, lg: 80 },
                  fontWeight: 800,
                  lineHeight: 1,
                  mb: 2,
                }}
              >
                {currentFlavor.title}
              </Typography>

              <Typography
                sx={{
                  color: 'white',
                  fontSize: { xs: 16, md: 20 },
                  mb: 6,
                  maxWidth: '450px',
                  opacity: 0.8,
                  lineHeight: 1.6,
                }}
              >
                {currentFlavor.description}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Button
                  variant="contained"
                  endIcon={<ArrowRightAltIcon />}
                  sx={{
                    bgcolor: 'white',
                    color: '#121212',
                    px: { xs: 3, md: 4 },
                    py: { xs: 1.5, md: 2 },
                    fontSize: { xs: 16, md: 20 },
                    fontWeight: 600,
                    borderRadius: '100px',
                    textTransform: 'uppercase',
                    boxShadow: 'none',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.9)', boxShadow: '0 4px 14px rgba(0,0,0,0.1)' },
                  }}
                >
                  Buy Now
                </Button>
                <Typography 
                  component="span" 
                  sx={{ 
                    color: 'white', 
                    fontSize: { xs: 24, md: 32 }, 
                    fontWeight: 700 
                  }}
                >
                  {currentFlavor.price}
                </Typography>
              </Box>
            </motion.div>
          </AnimatePresence>
        </Box>

        {/* Right Side: Visuals (The Focal Point) */}
        <Box
          sx={{
            position: 'absolute',
            right: '25%', // Κεντράρισμα του Eclipse 7 στο δεξί μέρος
            top: '50%',
            transform: 'translate(50%, -50%)',
            width: { xs: '40vh', md: '50vh' },
            height: { xs: '40vh', md: '50vh' },
            maxWidth: '640px',
            maxHeight: '640px',
            minWidth: '280px',
            minHeight: '280px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Ellipse 7 (The Glow) */}
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

          {/* Current Bag */}
          <AnimatePresence custom={direction} mode="popLayout">
            <motion.img
              key={currentFlavor.id}
              src={currentFlavor.image}
              alt={currentFlavor.title}
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                filter: 'drop-shadow(20px 20px 50px rgba(0,0,0,0.3))',
                zIndex: 10,
              }}
            />
          </AnimatePresence>

          {/* Next Bag (Peek) */}
          <Box
            sx={{
              position: 'absolute',
              right: '-80%',
              width: { xs: '25vh', md: '32vh' },
              height: { xs: '25vh', md: '32vh' },
              maxWidth: '400px',
              maxHeight: '400px',
              minWidth: '180px',
              minHeight: '180px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0.6,
              filter: 'blur(8px)',
              zIndex: 5,
            }}
          >
             <AnimatePresence mode="wait">
              <motion.img
                key={nextFlavor.id}
                src={nextFlavor.image}
                alt={`Επόμενη γεύση: ${nextFlavor.title}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </AnimatePresence>
          </Box>
        </Box>
      </Box>

      {/* Bottom Navigation */}
      <Box
        sx={{
          width: '100%',
          px: { xs: 4, md: 8, lg: 12 },
          pb: 6,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
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
              px: 3, 
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
              px: 3,
              '&:hover': { background: 'rgba(255,255,255,0.2)' } 
            }}
          >
            <ArrowForwardIcon />
          </IconButton>
        </Box>

        <Box sx={{ position: 'absolute', right: { xs: 4, md: 12 }, display: 'flex', alignItems: 'baseline', color: 'white' }}>
          <Typography sx={{ fontSize: 48, fontWeight: 700 }}>0{currentIndex + 1}</Typography>
          <Typography sx={{ fontSize: 24, ml: 1, opacity: 0.6 }}>/0{layFlavors.length}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
