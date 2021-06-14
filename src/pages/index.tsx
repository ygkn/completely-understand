import {
  Container,
  Box,
  Heading,
  Button,
  Text,
  Stack,
  Link,
} from '@chakra-ui/react';
import { NextPage, GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import { useCallback } from 'react';
import { TwitterShareButton } from 'react-share';

import { useHappyTalk } from '../hooks/useHappyTalk';
import { useRandomWikipedia, PageInfo } from '../hooks/useRandomWikipedia';

type PageProps = { pageInfo?: PageInfo | undefined };

const IndexPage: NextPage = () => {
  const { drawNext: drawWord, pageInfo, error } = useRandomWikipedia();
  const { draw: drawHappyTalk, happyTalk } = useHappyTalk();

  const showResult = useCallback(async () => {
    await drawWord();
    drawHappyTalk();
  }, [drawHappyTalk, drawWord]);

  return (
    <Container py={5} centerContent>
      <NextSeo title="完全に理解した" titleTemplate="%s" />
      <Box as="header">
        <Heading as="h1" py={4}>
          完全に理解した
        </Heading>
      </Box>
      <Button
        // className="bg-gray-900 text-white py-3 px-10 rounded-full focus:outline-none focus:shadow-outline shadow-lg hover:shadow-xl transition-shadow duration-100"
        onClick={showResult}
        type="button"
      >
        完全に理解する
      </Button>
      {pageInfo !== undefined && (
        <Box as="section" py={5} w="full">
          <Stack spacing={4} textAlign="center">
            <Text fontSize="xl" fontWeight="bold">
              <span role="img" aria-label="クラッカー">
                🎉
              </span>
              {happyTalk}
              <span role="img" aria-label="クラッカー">
                🎉
              </span>
              <br />「{pageInfo.title}」
              <br /> を完全に理解した！
            </Text>

            <Text>みんなに自慢しよう！</Text>
            <Text>
              <Button
                as={TwitterShareButton}
                url={`https://completely-understand.ygkn.dev/?pageid=${pageInfo.pageid}`}
                title={`${pageInfo.title}完全に理解した`}
                resetButtonStyle={false}
                colorScheme="blue"
              >
                Twitter でシェア
              </Button>
            </Text>
          </Stack>

          <Box
            as="blockquote"
            px="5"
            my="5"
            pos="relative"
            w="full"
            className="px-5 my-5 relative w-full"
          >
            <Box
              pos="absolute"
              top={0}
              left={0}
              opacity={0.8}
              fontWeight="bold"
              fontSize="3xl"
              lineHeight={1}
              aria-hidden="true"
            >
              “
            </Box>
            <Text>{pageInfo.extract}</Text>
            <Text textAlign="right">
              出典:
              <Link
                href={`https://ja.wikipedia.org/?curid=${pageInfo.pageid}`}
                color="blue.600"
                isExternal
              >
                フリー百科事典『ウィキペディア（Wikipedia）』
              </Link>
            </Text>
            <Box
              pos="absolute"
              bottom={0}
              right={0}
              opacity={0.8}
              fontWeight="bold"
              fontSize="3xl"
              lineHeight={1}
              aria-hidden="true"
            >
              ”
            </Box>
          </Box>
        </Box>
      )}

      <Box as="section" p={5} rounded="xl" border="1px" borderStyle="solid">
        <Stack spacing={4}>
          <Heading textAlign="center" fontSize="xl">
            これはなに
          </Heading>
          <Text>完全に理解するためのWebアプリです。</Text>
          <Text>
            「完全に理解する」ボタンを押すと Wikipedia
            の記事からランダムに選んだ記事を 1 つ表示します。
          </Text>{' '}
          <Heading textAlign="center" fontSize="xl">
            つくったひと
          </Heading>
          <Text>
            Twitter:
            <Link
              href="https://twitter.com/ygkn35034"
              color="blue.600"
              isExternal
            >
              @ygkn35034
            </Link>
          </Text>
        </Stack>
      </Box>
    </Container>
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
