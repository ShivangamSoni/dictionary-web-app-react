import { useRef, ReactNode } from 'react';

import { BsFillPlayFill as PlayIcon } from 'react-icons/bs';

import { WordResponse } from '@customTypes/api';

import ExternalLink from '@components/ExternalLink';

function SynAntList({ label, items }: { label: ReactNode; items: string[] }) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-4">
      {label}
      <ul className="flex gap-1 text-primary-purple font-semibold">
        {items.map((item) => (
          <li className="inline" key={item}>
            <button
              type="button"
              className="hover:underline"
              title={`Search ${item}`}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function WordDetails({
  definition,
}: {
  definition: WordResponse;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const phonetic =
    definition.phonetic ||
    definition.phonetics.find(
      (phonetic) => phonetic.text && phonetic.text !== ''
    )?.text ||
    '';
  const audio = definition.phonetics.find(
    (phonetic) => phonetic.audio && phonetic.audio !== ''
  )?.audio;

  const meanings = definition.meanings.reduce<
    WordResponse['meanings'][number][]
  >((res, meaning) => {
    const idx = res.findIndex(
      ({ partOfSpeech }) => partOfSpeech === meaning.partOfSpeech
    );
    if (idx !== -1) {
      res[idx] = {
        partOfSpeech: res[idx].partOfSpeech,
        definitions: [...res[idx].definitions, ...meaning.definitions],
        synonyms: [...res[idx].synonyms, ...meaning.synonyms],
        antonyms: [...res[idx].antonyms, ...meaning.antonyms],
      };
      return res;
    }

    return [...res, meaning];
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            {definition.word}
          </h2>
          <span className="block text-xl mt-3 text-primary-purple">
            {phonetic}
          </span>
        </div>
        {audio !== undefined && (
          <div>
            <audio src={audio} ref={audioRef} />
            <button
              type="button"
              className="flex items-center justify-center rounded-full text-4xl sm:text-5xl md:text-6xl p-3 md:p-4 bg-primary-purple bg-opacity-20 text-primary-purple transition-all hover:bg-opacity-100 hover:text-white"
              onClick={() => audioRef.current?.play()}
            >
              <PlayIcon />
            </button>
          </div>
        )}
      </div>

      <div>
        <h3 className="sr-only">Meanings</h3>
        <ul className="flex flex-col gap-10">
          {meanings.map(({ partOfSpeech, definitions, antonyms, synonyms }) => (
            <li key={partOfSpeech}>
              <div className="grid gap-10">
                <h3 className="relative isolate font-semibold italic text-xl after:content-[''] after:absolute after:h-[1px] after:bg-grey-100 after:inset-0 after:top-1/2 after:-translate-y-1/2 after:-z-[1]">
                  <span className="sr-only">Part of Speech</span>
                  <span className="bg-white dark:bg-grey-600 pr-4">
                    {partOfSpeech}
                  </span>
                </h3>
                <div className="grid gap-6">
                  <h4 className="text-grey-200">Meaning</h4>
                  <ul className="list-disc marker:text-primary-purple pl-10 grid gap-3">
                    {definitions.map(
                      ({ definition, example, synonyms, antonyms }) => (
                        <li className="pl-5" key={definition}>
                          <div className="grid gap-3">
                            <p>
                              <span className="sr-only">Definition: </span>
                              {definition}
                            </p>
                            {example && example !== '' && (
                              <p className="before:content-[open-quote] after:content-[close-quote]">
                                <span className="sr-only">Example: </span>
                                {example}
                              </p>
                            )}
                            {synonyms && synonyms.length > 0 && (
                              <SynAntList
                                label={<h3>Synonyms</h3>}
                                items={synonyms}
                              />
                            )}
                            {antonyms && antonyms.length > 0 && (
                              <SynAntList
                                label={<h3>Antonyms</h3>}
                                items={antonyms}
                              />
                            )}
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {synonyms.length > 0 && (
                  <SynAntList
                    label={<h4 className="text-grey-200">Synonyms</h4>}
                    items={synonyms}
                  />
                )}

                {antonyms.length > 0 && (
                  <SynAntList
                    label={<h4 className="text-grey-200">Antonym</h4>}
                    items={antonyms}
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <hr className="mb-5" />
        <div className="grid grid-cols-[auto_1fr] gap-4 text-sm">
          <h3 className="text-grey-200">Source</h3>
          <ul>
            {definition.sourceUrls.map((sourceUrl) => (
              <li key={sourceUrl}>
                <ExternalLink href={sourceUrl}>{sourceUrl}</ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
