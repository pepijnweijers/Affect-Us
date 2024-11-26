'use client'

import { useEffect, useState, useRef } from 'react';

const TTSFocusReader = () => {
    const [lastTabTime, setLastTabTime] = useState(0);
    const blockTabPress = useRef(false);

    const speakText = (text, pitch) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = (pitch 
            ? (pitch < 0.9 ? 0.6 : 0.8) 
            : 0.8) - 0.3;
        utterance.lang = "nl-NL";
        utterance.pitch = pitch || 0.9;
        window.speechSynthesis.speak(utterance);
    };


    const handleFocus = (event) => {
        if(event.target !== document.body) {
            const focusedElement = event.target;
            const textToRead = focusedElement.innerText || focusedElement.value || '';
            const pitch = parseFloat(event.target.getAttribute('data-pitch'));

            if (textToRead) {
                speakText(textToRead, pitch);
            }
        }
    };

    const handleBlur = () => {
        window.speechSynthesis.cancel();
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Tab') {
            const currentTime = Date.now();

            if (blockTabPress.current) {
                event.preventDefault(); // Block the Tab press
            } else {
                if (currentTime - lastTabTime < 1000) { // 500ms = 0.5 seconds
                    event.preventDefault(); // Block the Tab press
                    blockTabPress.current = true;
                } else {
                    setLastTabTime(currentTime); // Update lastTabTime
                    blockTabPress.current = true;
                }
            }

            setTimeout(() => {
                blockTabPress.current = false; // Allow the Tab press again after 500ms
            }, 500);
        }
    };

        // Functie om de vraag opnieuw uit te spreken wanneer de herhaal-knop wordt ingedrukt
        const handleRepeatQuestion = (event) => {
            if (event.target.tagName === 'BUTTON') {
                // Zoek het h2-element van de vraag en haal de pitch op uit het data-pitch attribuut
                const questionElement = event.target.closest('div').querySelector('h2');
                const textToRead = questionElement.innerText || '';
                const pitch = parseFloat(questionElement.getAttribute('data-pitch')); // Haal de pitch op als een float
                speakText(textToRead, pitch);  // Spreek de tekst uit met de juiste pitch
            }
        };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('focusin', handleFocus);
        document.addEventListener('focusout', handleBlur);

        const repeatButtons = document.querySelectorAll('.repeat-question-btn');
        repeatButtons.forEach(button => button.addEventListener('click', handleRepeatQuestion));


        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('focusin', handleFocus);
            document.removeEventListener('focusout', handleBlur);
            repeatButtons.forEach(button => button.removeEventListener('click', handleRepeatQuestion));
        };
    }, [lastTabTime]);

    return null;
};

export default TTSFocusReader;