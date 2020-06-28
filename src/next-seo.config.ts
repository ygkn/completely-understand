import { DefaultSeoProps } from 'next-seo';

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s | 完全に理解した',
  description:
    '完全に理解するためのWebアプリです。\n Wikipedia の記事からランダムに選んだ記事を 1 つ表示します。',
  twitter: {
    handle: '@ygkn35034',
    cardType: 'summary_large_image',
  },
  openGraph: {
    type: 'website',
    url: 'https://completely-understand.ygkn.dev/',
    title: '完全に理解した',
    description: 'あなたも完全理解',
    images: [
      {
        url: 'https://completely-understand.ygkn.dev/og-image.png',
        width: 876,
        height: 440,
        alt: '完全に理解した',
      },
    ],
  },
};
