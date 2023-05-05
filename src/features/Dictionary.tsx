import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import getDefinition from '@api/getDefinition';
import { WordResponse, WordErrorResponse } from '@customTypes/api';

import useSearch from '@store/search';

import SearchBar from './SearchBar';
import WordDetails from './WordDetails';
import WordDetailsLoading from './WordDetails/loading';
import NotFound from './NotFound';

function getCombinedDefinition(definitions: WordResponse[]) {
  return definitions.reduce<WordResponse>(
    (res, { word, phonetic, phonetics, meanings, sourceUrls }) => {
      if (word === res.word) {
        const combined: WordResponse = {
          word,
          meanings: [...res.meanings, ...meanings],
          phonetics: [...res.phonetics, ...phonetics],
          phonetic: res.phonetic || phonetic,
          sourceUrls: [...res.sourceUrls, ...sourceUrls],
        };
        combined.sourceUrls = [...new Set(combined.sourceUrls)];
        return combined;
      }

      return { word, phonetic, phonetics, meanings, sourceUrls };
    },
    {} as WordResponse
  );
}

export default function Dictionary() {
  const { search } = useSearch();
  const {
    data,
    isLoading,
    isFetching,
    isRefetching,
    isFetched,
    isError,
    error,
  } = useQuery<WordResponse[], AxiosError<WordErrorResponse>>({
    queryKey: ['definition', search.toLowerCase()],
    queryFn: () => getDefinition(search.toLowerCase()),
    staleTime: 1000 * 60 * 60 * 24, // Keep Fresh for 1 Day
    cacheTime: 1000 * 60 * 15, // Keep in Cache for 15 Minutes
    // Don't Retry or Refetch on 404
    retry: (failureCount, error) =>
      error.response?.status !== 404 && failureCount < 3,
    refetchOnWindowFocus: (query): boolean =>
      query.isActive() && error?.response?.status !== 404,
    refetchOnMount: (query): boolean =>
      query.isActive() && error?.response?.status !== 404,
    refetchOnReconnect: (query): boolean =>
      query.isActive() && error?.response?.status !== 404,
  });

  return (
    <main className="grid grid-rows-[auto_1fr] gap-8">
      <SearchBar />

      {isLoading || isFetching || isRefetching ? (
        <WordDetailsLoading />
      ) : (
        isFetched &&
        data && <WordDetails definition={getCombinedDefinition(data)} />
      )}

      {isError && error.response?.data && (
        <NotFound error={error.response?.data} />
      )}
    </main>
  );
}
