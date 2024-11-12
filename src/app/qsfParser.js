// qsfParser.js
// van de qualtrics naar de norm


function stripHTML(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
}

export function parseQSF(qsfData) {
    if (!qsfData.SurveyElements) {
        console.error('Geen SurveyElements gevonden in het QSF-bestand.');
        return [];
    }

    const questions = [];

    for (const el of qsfData.SurveyElements) {
        if (el.Element === 'SQ') { // Vraag-element
            let questionText = el.Payload.QuestionText ? el.Payload.QuestionText : "Onbekende vraag";
            questionText = stripHTML(questionText);

            const questionType = el.Payload.QuestionType;
            const exportTag = el.Payload.DataExportTag;
            let formattedQuestion = {};

            if (questionType === 'TE') {
                formattedQuestion = {
                    question: questionText,
                    type: 'textEntry',
                    answers: []
                };
            } else if (questionType === 'MC') {
                const answers = el.Payload.Choices
                    ? Object.values(el.Payload.Choices).map((choice, index) => ({
                        text: choice.Display || "Onbekend antwoord",
                        icon: `antwoord${index + 1}`
                    }))
                    : [];

                formattedQuestion = {
                    question: questionText,
                    type: 'singleChoice',
                    answers: answers
                };
            } else {
                formattedQuestion = {
                    question: questionText,
                    type: questionType,
                    answers: []
                };
            }

            formattedQuestion.dataExportTag = exportTag;
            questions.push(formattedQuestion);
        }
    }

    // Sorteer op basis van de DataExportTag
    questions.sort((a, b) => {
        const tagA = a.dataExportTag.replace('Q', '').padStart(5, '0');
        const tagB = b.dataExportTag.replace('Q', '').padStart(5, '0');
        return tagA.localeCompare(tagB, undefined, { numeric: true });
    });

    return questions;
}
