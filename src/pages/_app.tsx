import '@/global.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@/lib/theme';

const mtheme = createTheme();

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <ThemeProvider theme={mtheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </ChakraProvider>
  );
}

export default MyApp
