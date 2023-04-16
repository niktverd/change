import '../styles/globals.css';
import type { AppProps } from 'next/app';

export const APP_VERSION = 'v1.0.0';

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;
