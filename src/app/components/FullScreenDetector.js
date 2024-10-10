'use client';

import { useEffect } from 'react';

const FullScreenDetector = () => {
    const goFullScreen = (event) => {
        if (event.type === 'click' || event.type === 'keydown') {
            document.documentElement.requestFullscreen()
                .catch(err => {
                    console.error(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
                });
        }
    };

    useEffect(() => {
        document.addEventListener('focusout', goFullScreen);
        document.addEventListener('click', goFullScreen);
        document.addEventListener('keydown', goFullScreen);

        return () => {
            document.removeEventListener('focusout', goFullScreen);
            document.removeEventListener('click', goFullScreen);
            document.removeEventListener('keydown', goFullScreen);
        };
    }, []);

    return null;
};

export default FullScreenDetector;