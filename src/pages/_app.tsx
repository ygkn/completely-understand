import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';

import { SEO } from '../next-seo.config';
import '../style.css';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <DefaultSeo {...SEO} />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
