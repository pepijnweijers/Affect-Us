'use client';

import { useEffect, useState } from "react";
import { IconBike, IconMoodHappyFilled, IconMusic, IconMusicBolt, IconWalk } from '@tabler/icons-react';

export default function Home() {
    const [step, setStep] = useState(0);

    const questions = [
        {
            title: "Test vragenlijst",
            description: "Dit is een vragenlijst om te zien of wat wij gemaakt hebben goed werkt voor de cliënten. Je mag gerust tips geven. Dat helpt ons om beter te worden en onze fouten te verbeteren.",
            type: "startScreen",
        },
        {
            question: "Hoeveel hou je van zwemmen?",
            type: "singleChoice",
            answers: [
                { text: "Klein beetje", color: "#DF3030", pitch: 0.8 },
                { text: "Beetje", color: "#F38A12", pitch: 0.9 },
                { text: "Gewoon", color: "#FBBA00" },
                { text: "Veel", color: "#1F7DF7" },
                { text: "Heel veel", color: "#64CB40", pitch: 1 }
            ]
        },
        {
            question: "Hoe spannend vind je het om nieuwe dingen te doen?",
            type: "singleChoice",
            answers: [
                { text: "Klein beetje", color: "#DF3030", pitch: 0.8 },
                { text: "Beetje", color: "#F38A12", pitch: 0.9 },
                { text: "Gewoon", color: "#FBBA00" },
                { text: "Veel", color: "#1F7DF7" },
                { text: "Heel veel", color: "#64CB40", pitch: 1 }
            ]
        },
        {
            question: "Spreek je wel eens af met vrienden of vriendinnen?",
            type: "singleChoice",
            answers: [
                { text: "Ja", color: "#64CB40", pitch: 1 },
                { text: "Nee", color: "#DF3030" },

            ]
        },
        {
            question: "Ga je wel eens sporten?",
            type: "singleChoice",
            answers: [
                { text: "Ja", color: "#64CB40", pitch: 1 },
                { text: "Nee", color: "#DF3030" },

            ]
        },
        {
            question: "Wat vind je het leukste om te doen?",
            type: "singleChoice",
            answers: [
                { text: "Fietsen", icon: IconBike },
                { text: "Muziek Luisteren", icon: IconMusic },
                { text: "Wandelen", icon: IconWalk },

            ]
        },
    ];

    const updateStep = () => {
        setStep(prevStep => prevStep + 1);
    };

    const handleKeyDown = (event, answerId) => {
        if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault();
            document.getElementById(answerId).click();
        }
    };

    const repeatQuestion = () => {
        const question = questions[step];
        if (question && question.question) {
            const utterance = new SpeechSynthesisUtterance(question.question) ;
            speechSynthesis.speak(utterance);
        }
    };


    useEffect(() => {
        const questionElement = document.getElementById(`question-${step}`);
        if (questionElement) {
            questionElement.focus();
        }
    }, [step]);

    return (
        <div className="wrapper">
            {questions.length > step ?
                questions.map((question, index) => (
                step === index && (
                    question.type === 'startScreen' ? (
                        <div>
                            <h2 
                                id={`question-${index}`}
                                className="text-5xl font-semibold my-10"
                                tabIndex={0}
                            >
                                {question.title}
                            </h2>
                            <p tabIndex={0} className={''}>
                                {question.description}
                                <br />
                                Deze vragenlijst bestaat uit {questions.length - 1} vragen.
                            </p>
                            <button className={'bg-[#FBBA00] px-4 py-3 text-neutral-900'} onClick={() => setStep(step + 1)}>
                                Vragenlijst starten
                            </button>
                        </div>
                    ) : (
                    <div key={index} className="flex flex-col py-10 min-h-screen">
                        <div className="pb-10 flex items-center gap-x-10">
                            <p tabIndex={0} className="font-medium">
                                Vraag {index} van de {questions.length - 1}
                            </p>
                            {step > 1 &&
                                <button 
                                    tabIndex={0}
                                    onClick={() => setStep(step - 1)}
                                    className='px-5 py-4 bg-neutral-50/20'
                                    aria-label="Vorige vraag"
                                >
                                    Vorige vraag
                                </button>
                            }
                        </div>
                        
                        <div>
                        <h2 
                            id={`question-${index}`}
                            className="text-5xl font-semibold mb-10"
                            tabIndex={0}
                        >
                            {question.question} Kies uit {question.answers.map((answer, answerIndex) => (
                                `, ${answer.text}`
                            ))}
                        </h2>

                        <button 
                                    tabIndex={0}
                                    onClick={repeatQuestion}
                                    className='px-5 py-4  bg-neutral-50/20 border-4 border-white-500 mb-10'
                                    aria-label="de vraag herhalen"
                                >
                                    De vraag herhalen
                                </button>

                        </div>

                        <div className="flex-1 flex gap-5">
                            {question.answers.map((answer, answerIndex) => (
                                <div key={answerIndex} className={`flex-1`}>
                                    <label
                                        className={`group peer flex flex-col w-full h-full text-4xl font-semibold text-white bg-neutral-800 border-2 border-neutral-50`}
                                        tabIndex={0}
                                        data-pitch={answer.pitch}
                                        onKeyDown={(e) => handleKeyDown(e, `answer-${index}-${answerIndex}`)}
                                        for={`answer-${index}-${answerIndex}`}
                                    >
                                        {answer.color ? (
                                        <div className="w-full h-full flex items-center justify-center opacity-50 group-focus:opacity-100 group-hover:opacity-100 motion-reduce:duration-0 duration-500 pointer-events-none" style={{ backgroundColor: answer.color }} />
                                        ) : ( answer.icon &&
                                            <div className="w-full h-full flex items-center justify-center">
                                                <answer.icon size={192} />
                                            </div>
                                        )}
                                        <input
                                            id={`answer-${index}-${answerIndex}`}
                                            className="opacity-0"
                                            type="radio"
                                            tabIndex={-1}
                                            name={question.question}
                                            value={answer.text}
                                            onClick={() => updateStep()}
                                        />
                                        <span className="block py-10 text-center" tabIndex={-1}>
                                            {answer.text}
                                        </span>
                                    </label>
                                    <div className={`absolute motion-reduce:!opacity-0 peer-focus:animate-fadeHighlight peer-hover:animate-fadeHighlight opacity-0 inset-0 -z-10 duration-300`} style={{ backgroundColor: answer.color }} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )) : (
                <p>
                    Eind scherm
                </p>
            )}
        </div>
    );
}
