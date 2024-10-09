'use client'

import { useEffect } from 'react';

const TTSFocusReader = () => {
    const speakText = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.8;
        utterance.lang = "nl-NL";
        utterance.pitch = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    const handleFocus = (event) => {
        const focusedElement = event.target;
        const textToRead = focusedElement.innerText || focusedElement.value || '';

        if (textToRead) {
            speakText(textToRead);
        }
    };

    const handleBlur = () => {
        window.speechSynthesis.cancel();
    };

    useEffect(() => {
        document.addEventListener('focusin', handleFocus);
        document.addEventListener('focusout', handleBlur);

        return () => {
            document.removeEventListener('focusin', handleFocus);
            document.removeEventListener('focusout', handleBlur);
        };
    }, []);

    return null;
};

export default TTSFocusReader;