import { useCallback, useState } from 'react';

import { fetchPageInfo, PageInfo, Query } from '../lib/wikipedia';

export const useWikipedia = ({
  initialPageInfo,
}: {
  initialPageInfo?: PageInfo;
} = {}): {
  drawNext: (query: Query) => Promise<unknown>;
  pageInfo: PageInfo | undefined;
  error: unknown;
} => {
  const [pageInfo, setPageInfo] = useState<PageInfo | undefined>(
    initialPageInfo
  );
  const [error, setError] = useState<Error | undefined>();

  const drawNext = useCallback(
    (query: Query) => fetchPageInfo(query).then(setPageInfo).catch(setError),
    []
  );

  return {
    drawNext,
    pageInfo,
    error,
  };
};
