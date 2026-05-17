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

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % layFlavors.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + layFlavors.length) % layFlavors.length);
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

      {/* Header */}
      <Header />

      <Box
        component="main"
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          px: { xs: 3, md: 6, lg: 9, xl: 10 },
          position: 'relative',
          zIndex: 5,
        }}
      >
        {/* Left Side: Content */}
        <Box sx={{ flex: '0 0 45%', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          {/* Badge: 100% Σταθερό και Αμετάβλητο */}
          <Box
            sx={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.2)', // 20% Fill από το Figma
              border: '1px solid rgba(255,255,255,0.24)', // 24% Inside Stroke από το Figma
              borderRadius: '100px',
              px: { xs: 2, xl: 2.5 },
              py: { xs: 0.5, xl: 0.75 },
              mb: { xs: 1.5, md: 2, xl: 2.5 },
            }}
          >
            <Typography sx={{ color: 'white', fontWeight: 600, fontSize: { xs: 11, xl: 12 }, textTransform: 'uppercase', letterSpacing: 1 }}>
              Try new Lays
            </Typography>
          </Box>

          {/* Τίτλος: Ανεξάρτητο Sliding Animation με σταθερό minHeight για αποφυγή layout shifting */}
          <Box sx={{ width: '100%', minHeight: { xs: '76px', sm: '100px', md: '124px', lg: '146px', xl: '160px' }, display: 'flex', alignItems: 'center' }}>
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
                    fontSize: { xs: 32, sm: 42, md: 52, lg: 62, xl: 68 }, // Μειωμένο μέγεθος τίτλου
                    fontWeight: 800,
                    lineHeight: 1.1,
                    letterSpacing: '-0.03em',
                  }}
                >
                  {currentFlavor.title}
                </Typography>
              </motion.div>
            </AnimatePresence>
          </Box>

          {/* Περιγραφή: Ανεξάρτητο Sliding Animation με σταθερό minHeight */}
          <Box sx={{ width: '100%', minHeight: { xs: '66px', sm: '76px', md: '86px', xl: '96px' }, mb: { xs: 2.5, md: 3, xl: 4 }, display: 'flex', alignItems: 'center' }}>
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
                    fontSize: { xs: 13, sm: 14, md: 15, xl: 16.5 }, // Μειωμένο μέγεθος περιγραφής
                    maxWidth: '440px',
                    opacity: 0.9,
                    lineHeight: 1.6,
                  }}
                >
                  {currentFlavor.description}
                </Typography>
              </motion.div>
            </AnimatePresence>
          </Box>

          {/* Action Area (Buy Now & Price): 100% Σταθερό και Αμετάβλητο */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Button
              variant="contained"
              endIcon={<ArrowRightAltIcon />}
              sx={{
                bgcolor: 'white',
                color: '#121212',
                px: { xs: '18px', md: '22px', xl: '26px' }, // Αναλογικά scaled-down padding
                py: { xs: '10px', md: '12px', xl: '14px' }, // Αναλογικά scaled-down padding
                fontSize: { xs: 13, md: 14, lg: 15, xl: 16 }, // Μειωμένο μέγεθος γραμματοσειράς
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
                fontSize: { xs: 28, md: 34, lg: 40, xl: 44 }, // Μειωμένο μέγεθος τιμής
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
            position: 'absolute',
            right: '25%',
            top: '50%',
            transform: 'translate(50%, -50%)',
            width: { xs: '38vh', sm: '44vh', md: '48vh', lg: '52vh', xl: '55vh' }, // Μειωμένο μέγεθος σακούλας (~10% μικρότερο)
            height: { xs: '38vh', sm: '44vh', md: '48vh', lg: '52vh', xl: '55vh' },
            maxWidth: '680px',
            maxHeight: '680px',
            minWidth: '260px',
            minHeight: '260px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
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
                  stiffness: 90,
                  damping: 18,
                  mass: 1,
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
          px: { xs: 3, md: 6, lg: 9, xl: 10 }, // Ευθυγραμμισμένο με το Header
          pb: { xs: 3, md: 4, xl: 5 }, // Μειωμένο κάτω κενό
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          zIndex: 10,
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
    </Box>
  );
}
