import { ChakraProvider } from '@chakra-ui/react';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import { VFC } from 'react';

import { seoConfig } from '../next-seo.config';
import { theme } from '../theme';

const MyApp: VFC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <DefaultSeo {...seoConfig} />
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
