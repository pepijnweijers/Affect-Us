'use client'

import { useEffect } from 'react';

const TTSFocusReader = () => {
    const speakText = (text, pitch) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = (pitch 
            ? (pitch < 0.9 ? 0.6 : 0.8) 
            : 0.8) - 0.1;
        utterance.lang = "nl-NL";
        utterance.pitch = pitch || 0.9;
        window.speechSynthesis.speak(utterance);
    };

    const handleFocus = (event) => {
        if(event.target !== document.body) {
            const focusedElement = event.target;
            const textToRead = focusedElement.innerText || focusedElement.value || '';
            const pitch = event.target.getAttribute('data-pitch')

            if (textToRead) {
                speakText(textToRead, pitch);
            }
        }
    };

    const handleBlur = () => {
        window.speechSynthesis.cancel();
    };

    useEffect(() => {
        document.addEventListener('focusin', handleFocus);
        document.addEventListener('focusout', handleBlur);
        document.addEventListener('mouseover', handleFocus);
        document.addEventListener('mouseout', handleBlur);

        return () => {
            document.removeEventListener('focusin', handleFocus);
            document.removeEventListener('focusout', handleBlur);
            document.removeEventListener('mouseover', handleFocus);
            document.removeEventListener('mouseout', handleBlur);
        };
    }, []);

    return null;
};

export default TTSFocusReader;