import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import Slider from './components/Slider';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Slider />
    </ThemeProvider>
  );
}

export default App;
