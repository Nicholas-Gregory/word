import { Fragment, useEffect, useState } from "react";
import useWord from "./useWord";
import './style.css';

function getScreenWidth() {
    return window.innerWidth;
}

export default function App() {
    const { word, newWord } = useWord();
    const [screenWidth, setScreenWidth] = useState(getScreenWidth());

    useEffect(() => {
        newWord();

        const listener = e => setScreenWidth(getScreenWidth());

        window.addEventListener('resize', listener);
        return () => window.removeEventListener('resize', listener);
    }, []);

    return (
        <div 
            className="card"
            style={{ 
                backgroundColor: 'lightblue',
                height: '100vh',
                width: screenWidth > 768 ? '60vw' : '100vw',
                margin: 'auto'
            }}
        >
            <span
                className="card"
                style={{
                    backgroundColor: 'aliceblue',
                    width: 'fit-content'
                }}
            >
                {word?.word || 'Loading'}
            </span>
            <button onClick={newWord}>New Word</button>
            <div 
                className="card"
                style={{
                    backgroundColor: 'teal'
                }}
            >
                {word ? (
                <>
                    <p>
                        {word.origin}
                    </p>
                    {word.meanings.map((meaning, index) => (
                        <Fragment key={index}>
                            <p>
                                {meaning.partOfSpeech}
                            </p>
                            <ol>
                                {meaning.definitions.map((definition, index) => (
                                    <li key={index}>
                                        {definition.definition}
                                    </li>
                                ))}
                            </ol>
                            {word.meanings.length > 1 && index < word.meanings.length - 1 && <hr />}
                        </Fragment>
                    ))}
                </>
                ) : (
                    'Loading'
                )}
            </div>
        </div>
    )
}