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
import { useWikipedia } from '../hooks/useRandomWikipedia';
import { fetchPageInfo, PageInfo } from '../lib/wikipedia';

type PageProps = { pageInfo?: PageInfo | undefined; random: boolean };

const IndexPage: NextPage<PageProps> = ({
  pageInfo: initialPageInfo,
  random: initialRandom,
}) => {
  const {
    drawNext: drawWord,
    pageInfo,
    error,
  } = useWikipedia({ initialPageInfo });
  const { draw: drawHappyTalk, happyTalk } = useHappyTalk();

  const showResult = useCallback(async () => {
    await drawWord({ random: true });
    drawHappyTalk();
  }, [drawHappyTalk, drawWord]);

  return (
    <Container py={5} centerContent>
      <NextSeo
        title="完全に理解した"
        titleTemplate="%s"
        twitter={
          !initialRandom && pageInfo
            ? {
                handle: '@ygkn35034',
                cardType: 'summary_large_image',
              }
            : undefined
        }
        openGraph={
          !initialRandom && pageInfo
            ? {
                type: 'website',
                url: `https://completely-understand.ygkn.dev/?pageid=${encodeURIComponent(
                  pageInfo.pageid
                )}`,
                title: `${pageInfo.title}完全に理解した`,
                description: 'あなたも完全理解',
                images: [
                  {
                    url: `https://completely-understand.ygkn.dev/api/og-image?title=${encodeURIComponent(
                      pageInfo.title
                    )}&extact=${encodeURIComponent(pageInfo.extract)}`,
                    width: 1200,
                    height: 630,
                    alt: '${pageInfo.title}完全に理解した',
                  },
                ],
              }
            : undefined
        }
      />
      <Stack spacing={4} py={4} textAlign="center">
        <Box as="header">
          <Heading as="h1">完全に理解した</Heading>
        </Box>
        <Text>
          <Button colorScheme="gray" onClick={showResult} type="button">
            完全に理解する
          </Button>
        </Text>
      </Stack>
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
                colorScheme="twitter"
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
    const { query } = context;

    if (query === undefined) {
      return { props: { random: false } };
    }

    const pageIdNumber =
      typeof query.pageid === 'string' ? parseInt(query.pageid) : NaN;

    const pageInfo = await fetchPageInfo({
      random: query.random === 'true',
      pageId: pageIdNumber ? pageIdNumber : undefined,
      title: typeof query.title === 'string' ? query.title : undefined,
    });

    return { props: { pageInfo, random: query.random === 'true' } };
  } catch (error) {
    return { props: { random: false } };
  }
};

export default IndexPage;
