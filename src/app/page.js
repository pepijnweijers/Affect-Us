'use client';

import { useEffect, useState } from "react";

export default function Home() {
    const [step, setStep] = useState(0);

    const questions = [
        {
            question: "vind je het leuk hier?",
            type: "singleChoice",
            answers: [
                { text: "Ja", className: "antwoord1" },
                { text: "Nee", className: "antwoord2" },
                { text: "Geen antwoord", className: "antwoord3" }
            ]
        },
        {
            question: "Wat vind jij het leukste om te doen in je vrijetijd?",
            type: "singleChoice",
            answers: [
                { text: "Wandelen", className: "antwoord1" },
                { text: "Sporten", className: "antwoord2" },
                { text: "Boek lezen", className: "antwoord3" }
            ]
        },
        {
            question: "Hoe erg heb je het hier naar je zin?",
            type: "singleChoice",
            answers: [
                { text: "Totaal niet", className: "antwoord1" },
                { text: "Niet zo", className: "antwoord2" },
                { text: "Neutraal", className: "antwoord3" },
                { text: "Leuk", className: "antwoord4" },
                { text: "Super leuk", className: "antwoord5" }

            ]
        },
        {
            question: "Mijn gezondheid is even goed als die van de meeste van mijn vrienden.",
            type: "singleChoice",
            answers: [
                { text: "Helemaal oneens", className: "antwoord1" },
                { text: "Oneens", className: "antwoord2" },
                { text: "Neutraal", className: "antwoord3" },
                { text: "Eens", className: "antwoord4" },
                { text: "Helemaal eens", className: "antwoord5" }
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
                        <div>
                            <p tabIndex={0} className="font-medium">
                                Vraag {index+1} van de {questions.length}
                            </p>
                            <h2 
                                id={`question-${index}`}
                                className="text-5xl font-semibold mt-4 mb-8"
                                tabIndex={0}
                            >
                                {question.question}
                            </h2>
                        </div> 

                        <div className="flex-1 flex gap-4">
                            {question.answers.map((answer, answerIndex) => (
                                <div key={answerIndex} className={`flex-1`}>
                                    <button
                                        className={`peer w-full h-full text-4xl font-semibold text-white ${answer.className}`}
                                        tabIndex={0}
                                        onKeyDown={(e) => handleKeyDown(e, `answer-${index}-${answerIndex}`)}
                                        id={`answer-${index}-${answerIndex}`}
                                        onClick={() => updateStep()}
                                    >
                                        {answer.text} 
                                    </button>
                                    <div className={`absolute motion-reduce:!opacity-0 peer-focus:opacity-100 opacity-0 ${answer.className} inset-0 -z-10 duration-500`} />
                                </div>
                            ))}
                        </div>
                    </div>
                )
            )) : (
                <div>
                    Eind scherm
                </div>
            )}
        </div>
    );
}
