import { DefaultSeoProps } from 'next-seo';

const siteName = '完全に理解した';

export const SEO: DefaultSeoProps = {
  titleTemplate: `%s | ${siteName}`,
  description:
    '完全に理解するためのWebアプリです。\n Wikipedia の記事からランダムに選んだ記事を 1 つ表示します。',
  twitter: {
    handle: '@ygkn35034',
    cardType: 'summary_large_image',
  },
  openGraph: {
    type: 'website',
    url: 'https://completely-understand.ygkn.dev/',
    title: siteName,
    description: 'あなたも完全理解',
    images: [
      {
        url: 'https://completely-understand.ygkn.dev/og-image.png',
        width: 876,
        height: 440,
        alt: siteName,
      },
    ],
  },
};
