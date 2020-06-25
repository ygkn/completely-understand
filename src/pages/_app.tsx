import { AppProps } from 'next/app';

import '../style.css';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
