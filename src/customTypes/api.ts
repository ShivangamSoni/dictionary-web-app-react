interface Definition {
  definition: string;
  synonyms: string[];
  antonyms: string[];
  example?: string;
}

interface Meaning {
  partOfSpeech:
    | 'noun'
    | 'pronoun'
    | 'verb'
    | 'adverb'
    | 'adjective'
    | 'preposition'
    | 'conjunction'
    | 'interjection';
  definitions: Definition[];
  synonyms: string[];
  antonyms: string[];
}

interface Phonetic {
  text?: string;
  audio?: string;
}

export interface WordResponse {
  word: string;
  phonetic?: string;
  phonetics: Phonetic[];
  meanings: Meaning[];
  sourceUrls: string[];
}

export interface WordErrorResponse {
  title: string;
  message: string;
  resolution: string;
}
