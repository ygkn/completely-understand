import '../styles/index.css';
import type { AppProps } from 'next/app';
import { VFC, useEffect } from 'react';

const MyApp: VFC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    const setFillHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', setFillHeight, { passive: true });

    setFillHeight();

    return () => window.removeEventListener('resize', setFillHeight);
  }, []);

  return <Component {...pageProps} />;
};

export default MyApp;
