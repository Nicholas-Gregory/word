import { useEffect } from "react";
import useWord from "./useWord"

export default function App() {
    const { word, newWord } = useWord();

    useEffect(() => {
        newWord()
    }, []);

    return (
        <>
            {word ? word.word : "Loading"}    
        </>
    )
}