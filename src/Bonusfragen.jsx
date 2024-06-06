// von https://github.com/chrisblakely01/quiz-app/blob/master/final/src/App.js
// https://www.freecodecamp.org/news/how-to-build-a-quiz-app-using-react/
import React, { useState } from 'react';
import './Bonusfragen.css'
const Bonusfragen = () => {
    const questions = [
        {
            questionText: 'Wie lang ist die Bega?',
            answerOptions: [
                { answerText: '10- 30km', isCorrect: false },
                { answerText: '31- 50km', isCorrect: true },
                { answerText: '50+ km', isCorrect: false },
            ],
            correctAnswer: 'Die Bega ist 43,9km lang'
        },
        {
            questionText: 'Wo entspringt die Bega?',
            answerOptions: [
                { answerText: 'Im Teutoburger Wald', isCorrect: false },
                { answerText: 'In den Weserbergland-Hügeln', isCorrect: false },
                { answerText: 'In den Eggegebirge', isCorrect: true },
            ],
            correctAnswer: 'In den Eggegebirge'
        },
        {
            questionText: 'Welche historische Bedeutung hat die Bega für Lemgo?',
            answerOptions: [
                { answerText: 'Sie diente als natürliche Grenze zur Stadtmauer.', isCorrect: false },
                { answerText: 'Sie war eine wichtige Handelsroute im Mittelalter.', isCorrect: true },
                { answerText: 'Sie wurde zur Energiegewinnung genutzt.', isCorrect: false },
            ],
            correctAnswer: 'Sie war eine wichtige Handelsroute im Mittelalter.'
        },
        {
            questionText: 'Welcher Nebenfluss mündet in die Bega in der Nähe von Lemgo?',
            answerOptions: [
                { answerText: 'Die Werre', isCorrect: false },
                { answerText: 'Die Emmer', isCorrect: true },
                { answerText: 'Die Lippe', isCorrect: false },
            ],
            correctAnswer: 'Die Emmer'
        },
        {
            questionText: 'Welche Tierarten sind typisch für das Ökosystem entlang der Bega?',
            answerOptions: [
                { answerText: 'Biber und Eisvögel', isCorrect: true },
                { answerText: 'Rehe und Füchse', isCorrect: false },
                { answerText: 'Singvögel und Eichhörnchen', isCorrect: false },
            ],
            correctAnswer: 'Biber und Eisvögel'
        },
        {
            questionText: 'Welche historische Bedeutung hatte die Bega für die Industrie in Lemgo?',
            answerOptions: [
                { answerText: 'Sie diente als Wasserweg für den Transport von Waren.', isCorrect: true },
                { answerText: 'Sie trieb Wassermühlen zur Getreideverarbeitung an.', isCorrect: false },
                { answerText: 'Sie wurde zur Bewässerung von landwirtschaftlichen Flächen genutzt.', isCorrect: false },
            ],
            correctAnswer: 'Sie diente als Wasserweg für den Transport von Waren.'
        },
        {
            questionText: 'In welchem Jahrhundert wurde die Bega erstmals urkundlich erwähnt?',
            answerOptions: [
                { answerText: 'Im 9. Jahrhundert', isCorrect: false },
                { answerText: 'Im 12. Jahrhundert', isCorrect: true },
                { answerText: 'Im 15. Jahrhundert', isCorrect: false },
            ],
            correctAnswer: 'Im 12. Jahrhundert'
        },
        {
            questionText: 'Welche ökologischen Maßnahmen werden entlang der Bega in Lemgo durchgeführt?',
            answerOptions: [
                { answerText: 'Renaturierung von Uferbereichen', isCorrect: true },
                { answerText: 'Bau von Staudämmen zur Regulierung des Wasserflusses', isCorrect: false },
                { answerText: 'Anlage von Freizeiteinrichtungen entlang des Flussufers', isCorrect: false },
            ],
            correctAnswer: 'Renaturierung von Uferbereichen'
        },
        {
            questionText: 'Welches Fest wird in Lemgo jährlich entlang der Bega gefeiert?',
            answerOptions: [
                { answerText: 'Das Bega-Sommerfest', isCorrect: false },
                { answerText: 'Das Bega-Drachenfest', isCorrect: true },
                { answerText: 'Das Bega-Kanufestival', isCorrect: false },
            ],
            correctAnswer: 'Das Bega-Drachenfest'
        },
        {
            questionText: 'Welche kulturelle Bedeutung hat die Bega für die Stadt Lemgo?',
            answerOptions: [
                { answerText: 'Sie ist Namensgeberin für eine bekannte Brücke.', isCorrect: false },
                { answerText: 'Sie inspirierte zahlreiche Maler und Dichter.', isCorrect: true },
                { answerText: 'Sie wird in der Stadtflagge von Lemgo dargestellt.', isCorrect: false },
            ],
            correctAnswer: 'Sie inspirierte zahlreiche Maler und Dichter.'
        },
    ];
    //         questionText: 'Wie lange ist die Bega?',
    //         answerOptions: [
    //             { answerText: '10- 30km', isCorrect: false },
    //             { answerText: '31- 50km', isCorrect: true },
    //             { answerText: '50+ km', isCorrect: false },
    //         ],
    //         correctAnswer: 'Die Bega ist 43,9km lang'
    //     },
    //     {
    //         questionText: 'Was ist ein Retentionraum?',
    //         answerOptions: [
    //             { answerText: 'Ein Raum wo der Wasserstand überprüft wird', isCorrect: false },
    //             { answerText: 'Eine Art Becken wo das überschüssige Wasser hingeleitet wird, damit die Bega nicht so schnell überläuft', isCorrect: true },
    //             { answerText: 'Eine Stelle in der Bega wo das Flussbett breiter ist', isCorrect: false },
                
    //         ],
    //         correctAnswer: 'Eine Art Becken wo das überschüssige Wasser hingeleitet wird, damit die Bega nicht so schnell überläuft'
    //     },
    //     {
    //         questionText: 'Was ist Renaturisierung??',
    //         answerOptions: [
    //             { answerText: 'Einen begradigten Fluss wieder in seine Ursprüngliche Form bringen', isCorrect: true },
    //             { answerText: 'Einen Fluss begradigen', isCorrect: false },
    //             { answerText: 'Ressourcen vor Ort recyceln und woanders wiederverwenden.', isCorrect: false },
    //         ],
    //         correctAnswer: 'Einen begradigten Fluss wieder in seine Ursprüngliche Form bringen'
    //     },
        

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }
        setShowAnswer(true);
        setTimeout(() => {
            setShowAnswer(false);
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < questions.length) {
                setCurrentQuestion(nextQuestion);
            } else {
                setShowScore(true);
            }
        }, 2000); // Adjust the delay time as needed
    };

    return (
        <div className='app'>
            {showScore ? (
                <div className='score-section'>
                    You scored {score} out of {questions.length}
                </div>
            ) : (
                <>
                    <div className='question-section'>
                        <div className='question-count'>
                            <span>Question {currentQuestion + 1}</span>/{questions.length}
                        </div>
                        <div className='question-text'>{questions[currentQuestion].questionText}</div>
                    </div>
                    <div className='answer-section'>
                        {showAnswer && (
                            <div className='correct-answer'>
                                Correct Answer: {questions[currentQuestion].correctAnswer}
                            </div>
                        )}
                        {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                            <button key={index} onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>
                                {answerOption.answerText}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Bonusfragen;