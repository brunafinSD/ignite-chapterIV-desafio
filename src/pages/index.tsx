/* eslint-disable prettier/prettier */
import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

type Image = {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

type GetImages = {
  after: number,
  data: Image[];
}

export default function Home(): JSX.Element {

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    async ({ pageParam = null }): Promise<GetImages> => {
      const response = await api('/api/images', {
        params: {
          after: pageParam
        }
      });

      return response.data;
    }, {
    getNextPageParam: (lastPage) => lastPage?.after || null,
  }
  );

  const formattedData = useMemo((): Image[] => {
    const formatted = data?.pages.map(page => page.data).flat();
    return formatted;
  }, [data]);

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <Error />
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button
            mt="6"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {`${isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}`}
          </Button>
        )}

      </Box>
    </>
  );
}
