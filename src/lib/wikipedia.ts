const apiEndPoint = 'https://ja.wikipedia.org/w/api.php?';

export type Query = { random?: boolean; title?: string; pageId?: number };

export type PageInfo = {
  pageid: number;
  title: string;
  extract: string;
};

const getUrl = (query: Query) =>
  `${apiEndPoint}${new URLSearchParams({
    origin: '*',
    action: 'query',
    format: 'json',
    prop: 'extracts',
    exintro: '1',
    explaintext: '1',
    grnnamespace: '0',
    ...(query.title ? { titles: query.title } : {}),
    ...(query.pageId ? { pageids: `${query.pageId}` } : {}),
    ...(query.random ? { generator: 'random' } : {}),
  })}`;

export const fetchPageInfo = async (query: Query): Promise<PageInfo> => {
  const result = await fetch(getUrl(query));

  const data = await result.json();

  const pages: undefined | { [K in string]: PageInfo } = data?.query?.pages;
  const pageInfo = pages && Object.values(pages)[0];

  if (pageInfo === undefined) {
    throw new Error(
      [
        'invalid data from Wikipedia API',
        '',
        JSON.stringify(data, null, 2),
      ].join('\n')
    );
  }

  return pageInfo;
};
