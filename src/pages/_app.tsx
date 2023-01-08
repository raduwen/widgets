import '@/global.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from '@/lib/AuthProvider';

const theme = createTheme();

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default MyApp
