import '@/styles/global.css';
import { initFirebase } from '@/lib/firebase';

function MyApp({ Component, pageProps }) {
  initFirebase();

  return <Component {...pageProps} />
}

export default MyApp;
