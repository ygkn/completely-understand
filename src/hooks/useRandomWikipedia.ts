import { useState } from 'react';

const randomApiUrl =
  'https://ja.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=extracts&generator=random&exintro=1&explaintext=1&grnnamespace=0';

export type PageInfo = {
  pageid: number;
  title: string;
  extract: string;
};

const useRandomWikipedia = (): {
  drawNext: () => unknown;
  pageInfo: PageInfo | undefined;
  error: unknown;
} => {
  const [pageInfo, setPageInfo] = useState<PageInfo | undefined>();
  const [error, setError] = useState<Error | undefined>();

  const drawNext = async () => {
    try {
      const result = await fetch(randomApiUrl);

      const data = await result.json();

      const pages: undefined | { [K in string]: PageInfo } = data?.query?.pages;
      const pageInfo = pages && Object.values(pages)[0];

      if (pageInfo === undefined) {
        setError(new Error('Invalid return data from Wikipedia'));
        return;
      }

      setPageInfo(pageInfo);
    } catch (e) {
      setError(e);
    }
  };

  return {
    drawNext,
    pageInfo,
    error,
  };
};

export default useRandomWikipedia;
