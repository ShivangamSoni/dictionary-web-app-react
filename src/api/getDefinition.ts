import { WordResponse } from '@customTypes/api';
import axios from 'axios';

export default async function getDefinition(word: string) {
  const { data } = await axios.get<WordResponse[]>(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  return data;
}
