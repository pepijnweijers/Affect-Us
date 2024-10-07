'use client';

import './CSS/styles.css'; 
import { useEffect, useState } from "react";

export default function Home() {
    const [step, setStep] = useState(0);

    const questions = [
        {
            number: "Vraag 1 van 5",
            question: "Hoe voel je je?",
            type: "singleChoice",
            answers: [
                { text: "Goed", className: "antwoord1" },
                { text: "Neutraal", className: "antwoord2" },
                { text: "Slecht", className: "antwoord3" }
            ]
        },
        {
            number: "Vraag 2 van 5",
            question: "Wat vind jij het leukste om te doen in je vrijetijd?",
            type: "singleChoice",
            answers: [
                { text: "Aan school zitten", className: "antwoord1" },
                { text: "Sporten", className: "antwoord2" },
                { text: "Boek lezen", className: "antwoord3" },
                { text: "Boek lezen", className: "antwoord3" },
                { text: "Boek lezen", className: "antwoord3" }
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
        <div className="container">
            {questions.map((question, index) => (
                step === index && (
                    <div key={index} className="question-container">
                    <div className="question">
                        <h2 id={`question-${index}`} tabIndex={0} className="question-number">
                            {question.number}</h2>
                        <p className="question-text">{question.question}</p>
                    </div> 
                        <div className="answers">
                            {question.answers.map((answer, answerIndex) => (
                                <div
                                    key={answerIndex}
                                    className={`answer-card ${answer.className}`}
                                    tabIndex={0}
                                    onKeyDown={(e) => handleKeyDown(e, `answer-${index}-${answerIndex}`)}
                                    onClick={() => updateStep()}
                                >
                                    {answer.text} 
                                </div>
                            ))}
                        </div>
                    </div>
                )
            ))}
        </div>
    );
}
