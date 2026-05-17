import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Mona Sans", "Baloo Bhai 2", sans-serif',
    h1: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Baloo Bhai 2", sans-serif',
      fontWeight: 600,
    },
    button: {
      fontFamily: '"Mona Sans", sans-serif',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '100px',
          textTransform: 'uppercase',
        },
      },
    },
  },
});

export default theme;
