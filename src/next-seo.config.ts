import { DefaultSeoProps } from 'next-seo';

import manifestJSON from '../public/manifest.json';

const siteName = manifestJSON.name;

export const seoConfig: DefaultSeoProps = {
  titleTemplate: `%s | ${siteName}`,
  description:
    '完全に理解するためのWebアプリです。\n Wikipedia の記事からランダムに選んだ記事を 1 つ表示します。',
  twitter: {
    handle: '@ygkn35034',
    cardType: 'summary',
  },
  openGraph: {
    type: 'website',
    url: 'https://completely-understand.ygkn.dev/',
    title: siteName,
    description: 'あなたも完全理解',
    images: [
      {
        url: 'https://completely-understand.ygkn.dev/icons/512maskable.png',
        width: 876,
        height: 440,
        alt: siteName,
      },
    ],
  },
  additionalMetaTags: [
    { name: 'application-name', content: manifestJSON.short_name },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black-translucent',
    },
    { name: 'apple-mobile-web-app-title', content: manifestJSON.short_name },
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'theme-color', content: '#ffffff' },
  ],
};
