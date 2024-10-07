'use client';

import './CSS/styles.css'; 
import { useEffect, useState } from "react";

export default function Home() {
    const [step, setStep] = useState(0);

    const questions = [
        {
            number: "vraag 1 van 5",
            question: "Hoe voel je je?",
            type: "singleChoice",
            answers: [
                { text: "Goed", className: "antwoord1" },
                { text: "Neutraal", className: "antwoord2" },
                { text: "Slecht", className: "antwoord3" }
            ]
        },
        {
            number: "vraag 2 van 5",
            question: "Wat ga je vandaag doen?",
            type: "singleChoice",
            answers: [
                { text: "School", className: "antwoord1" },
                { text: "Sporten", className: "antwoord2" },
                { text: "Lezen", className: "antwoord3" }
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
                        <h2 id={`question-${index}`} tabIndex={0} className="question">
                            <p> {question.number} </p>
                            {question.question}</h2>  
                        <div className="answers">
                            {question.answers.map((answer, answerIndex) => (
                                <div
                                    key={answerIndex}
                                    className={`answer-card ${answer.className}`} // Wijziging hier: Gebruik de className
                                    tabIndex={0}
                                    onKeyDown={(e) => handleKeyDown(e, `answer-${index}-${answerIndex}`)}
                                    onClick={() => updateStep()} // Bij klikken op de antwoordkaart
                                >
                                    {answer.text} {/* Toont de tekst van het antwoord */}
                                </div>
                            ))}
                        </div>
                    </div>
                )
            ))}
        </div>
    );
}
