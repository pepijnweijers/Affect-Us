'use client'

import { useEffect, useState } from "react";

export default function Home() {
    const [step, setStep] = useState(0);

    const questions = [
        {
            question: "Hoe voel je je?",
            type: "singleChoice",
            answers: [
                "Goed",
                "Neutraal",
                "Slecht"
            ]
        },
        {
            question: "Wat ga je vandaag doen?",
            type: "singleChoice",
            answers: [
                "School",
                "Sporten",
                "Lezen"
            ]
        }
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
        <div>
            {questions.map((question, index) => (
                step === index && (
                    <div key={index}>
                        <h2 id={`question-${index}`} tabIndex={0}>{question.question}</h2>
                        {question.answers.map((answer, answerIndex) => (
                            <label
                                key={answerIndex}
                                htmlFor={`answer-${index}-${answerIndex}`}
                                tabIndex={0} 
                                onKeyDown={(e) => handleKeyDown(e, `answer-${index}-${answerIndex}`)} 
                            >
                                <input
                                    type="radio"
                                    id={`answer-${index}-${answerIndex}`}
                                    name={question.question}
                                    value={answer}
                                    onClick={() => updateStep()}
                                    tabIndex={-1}
                                />
                                {answer}
                            </label>
                        ))}
                    </div>
                )
            ))}
        </div>
    );
}