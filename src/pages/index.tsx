import { NextPage, GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import { useCallback } from 'react';
import { TwitterShareButton } from 'react-share';

import { useRandomWikipedia, useHappyTalk } from '../hooks';
import { HappyTalk } from '../hooks/useHappyTalk';
import { PageInfo } from '../hooks/useRandomWikipedia';

type ComponentProps = Omit<
  ReturnType<typeof useRandomWikipedia>,
  'drawNext'
> & {
  showResult: () => unknown;
  happyTalk: HappyTalk;
};

type PageProps = { pageInfo?: PageInfo | undefined };

const Component: React.FC<ComponentProps> = ({
  showResult,
  pageInfo,
  happyTalk,
}) => (
  <div className="max-w-3xl mx-auto flex flex-col items-center px-5">
    <NextSeo title="完全に理解した" titleTemplate="%s" />
    <header>
      <h1 className="sm:text-3xl text-2xl font-medium title-font text-center text-gray-900 m-10">
        完全に理解した
      </h1>
    </header>
    <button
      className="bg-gray-900 text-white py-3 px-10 rounded-full focus:outline-none focus:shadow-outline shadow-md hover:shadow-lg transition-shadow duration-100"
      onClick={showResult}
      type="button"
    >
      完全に理解する
    </button>
    {pageInfo !== undefined && (
      <section className="my-10 w-full">
        <p className="text-xl font-bold text-center">
          <span role="img" aria-label="クラッカー">
            🎉
          </span>
          {happyTalk}
          <span role="img" aria-label="クラッカー">
            🎉
          </span>
          {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
          <br />「{pageInfo.title}」<br />
          を完全に理解した！
        </p>

        <p className="my-5 text-center">みんなに自慢しよう！</p>
        <p className="my-5 text-center">
          <TwitterShareButton
            url={`https://completely-understand.ygkn.dev/?pageid=${pageInfo.pageid}`}
            title={`${pageInfo.title}完全に理解した`}
            className="bg-blue-500 text-white py-2 px-5 rounded-full focus:outline-none focus:shadow-outline"
            resetButtonStyle={false}
          >
            Twitter でシェア
          </TwitterShareButton>
        </p>

        <blockquote className="px-5 my-5 relative w-full">
          <div
            className="absolute top-0 left-0 text-gray-800 font-bold text-3xl leading-none"
            aria-hidden="true"
          >
            “
          </div>
          <p>{pageInfo.extract}</p>
          <p className="text-right">
            出典:
            <a
              href={`https://ja.wikipedia.org/?curid=${pageInfo.pageid}`}
              className="text-blue-700 hover:underline"
            >
              フリー百科事典『ウィキペディア（Wikipedia）』
            </a>
          </p>
          <div
            className="absolute bottom-0 right-0 text-gray-800 font-bold text-3xl leading-none"
            aria-hidden="true"
          >
            ”
          </div>
        </blockquote>
      </section>
    )}

    <section className="my-10 w-full border border-solid border-current rounded p-5">
      <h1 className="sm:text-2xl text-xl font-medium title-font text-center text-gray-900 mb-5">
        これはなに
      </h1>
      <p>完全に理解するためのWebアプリです。</p>
      <p>
        「完全に理解する」ボタンを押すと Wikipedia
        の記事からランダムに選んだ記事を 1 つ表示します。
      </p>
      <h1 className="sm:text-2xl text-xl font-medium title-font text-center text-gray-900 mb-5">
        つくったひと
      </h1>
      <p>
        Twitter:
        <a
          className="text-blue-700 hover:underline"
          href="https://twitter.com/ygkn35034"
        >
          @ygkn35034
        </a>
      </p>
    </section>
  </div>
);

const IndexPage: NextPage<PageProps> = ({ pageInfo: initialPageInfo }) => {
  const { drawNext: drawWord, pageInfo, error } = useRandomWikipedia();
  const { draw: drawHappyTalk, happyTalk } = useHappyTalk();

  const showResult = useCallback(async () => {
    await drawWord();
    drawHappyTalk();
  }, [drawHappyTalk, drawWord]);

  return (
    <Component
      pageInfo={pageInfo || initialPageInfo}
      error={error}
      showResult={showResult}
      happyTalk={happyTalk}
    />
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context
) => {
  try {
    const { pageid } = context.query;

    if (typeof pageid !== 'string') {
      return { props: {} };
    }

    const result = await fetch(
      `https://ja.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=1&explaintext=1&pageids=${pageid}`
    );

    const data = await result.json();

    const pages: undefined | { [K in string]: PageInfo } = data?.query?.pages;
    const pageInfo = pages && Object.values(pages)[0];

    return { props: { pageInfo } };
  } catch (e) {
    return { props: {} };
  }
};

export default IndexPage;
