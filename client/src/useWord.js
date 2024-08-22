import { useEffect, useState } from "react";
import wordsFile from './words.txt'

export default function useWord() {
    const [word, setWord] = useState();

    async function getWordListText() {
        return await (await fetch(wordsFile)).text();
    }

    async function getRandomWordText() {
        const wordListArray = (await getWordListText()).split('\n');

        return wordListArray[Math.floor(Math.random() * wordListArray.length)];
    }

    async function getRandomWord() {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${await getRandomWordText()}`);

        if (response.ok) {
            return await response.json();
        } else {
            return await getRandomWord();
        }
    }

    async function newWord() {
        setWord(null);

        getRandomWord().then(json => setWord(json[0]));
    }

    return { word, newWord }
}