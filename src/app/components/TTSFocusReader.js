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
            const pitch = event.target.getAttribute('data-pitch');

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

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('focusin', handleFocus);
        document.addEventListener('focusout', handleBlur);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('focusin', handleFocus);
            document.removeEventListener('focusout', handleBlur);
        };
    }, [lastTabTime]);

    return null;
};

export default TTSFocusReader;