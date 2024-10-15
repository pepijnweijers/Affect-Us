'use client';

import { useEffect, useState } from "react";
import { IconMoodHappyFilled } from '@tabler/icons-react';

export default function Home() {
    const [step, setStep] = useState(0);

    const questions = [
        {
            question: "vind je het leuk hier?",
            type: "singleChoice",
            answers: [
                { text: "Ja", color: "#64CB40", pitch: 1.3 },
                { text: "Nee", color: "#DF3030", pitch: 0.1 },
                { text: "Geen antwoord", color: "#FBBA00" }
            ]
        },
        {
            question: "Wat vind jij het leukste om te doen in je vrijetijd?",
            type: "singleChoice",
            answers: [
                { text: "Wandelen", icon: "antwoord1" },
                { text: "Sporten", icon: "antwoord2" },
                { text: "Boek lezen", icon: "antwoord3" }
            ]
        },
        {
            question: "Hoe erg heb je het hier naar je zin?",
            type: "singleChoice",
            answers: [
                { text: "Totaal niet", color: "#DF3030" },
                { text: "Niet zo", color: "#F38A12" },
                { text: "Neutraal", color: "#FBBA00" },
                { text: "Leuk", color: "#1F7DF7" },
                { text: "Super leuk", color: "#64CB40" }

            ]
        },
        {
            question: "Mijn gezondheid is even goed als die van de meeste van mijn vrienden.",
            type: "singleChoice",
            answers: [
                { text: "Helemaal oneens", color: "#DF3030" },
                { text: "Oneens", color: "#F38A12" },
                { text: "Neutraal", color: "#FBBA00" },
                { text: "Eens", color: "#1F7DF7" },
                { text: "Helemaal eens", color: "#64CB40" }
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
                    <div key={index} className="flex flex-col py-10 min-h-screen">
                        <div className="pb-10 flex items-center gap-x-10">
                            <p tabIndex={0} className="font-medium">
                                Vraag {index+1} van de {questions.length}
                            </p>
                            {step > 0 &&
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
                        <h2 
                            id={`question-${index}`}
                            className="text-5xl font-semibold mb-10"
                            tabIndex={0}
                        >
                            {question.question}
                        </h2>

                        <div className="flex-1 flex gap-10">
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
                                                <IconMoodHappyFilled size={192} />
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
                )
            )) : (
                <p>
                    Eind scherm
                </p>
            )}
        </div>
    );
}
