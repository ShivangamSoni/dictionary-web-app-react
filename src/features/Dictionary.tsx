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
    queryKey: ['definition', search],
    queryFn: () => getDefinition(search),
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
