import React, { useState } from 'react';
import Bega from './images/Bega.png';
import BackgroundImage from './images/Background.png'; 
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
            questionText: 'Wo mündet die Bega?',
            answerOptions: [
                { answerText: 'Donau', isCorrect: false },
                { answerText: 'Rhein', isCorrect: false },
                { answerText: 'Werre', isCorrect: true },
            ],
            correctAnswer: 'In die Werre'
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
        }, 2000); // 2s wird die Lösung angezeigt
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center">
            {/* Hintergrundbild */}
            <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${BackgroundImage})` }}
            ></div>

            {/* Fragen und Antworten Container */}
            <div className="relative bg-[#102717a0] p-6 rounded-lg w-full max-w-md">
                {showScore ? (
                    <div className="bg-[#515b4c]/60 rounded-[13px] p-4 text-center text-[#d9d7d7] text-xl font-normal font-['Inter']">
                        Du hast {score} von {questions.length} Fragen richtig beantwortet
                    </div>
                ) : (
                    <div className="bg-[#515b4c]/60 rounded-[13px] p-4">
                        <img className="w-[136px] h-[194px] rounded-[23px] mx-auto" src={Bega} alt="Quiz" />
                        <div className="text-center text-[#d9d7d7] text-xl font-normal font-['Inter'] mt-4 mb-2">
                            {questions[currentQuestion].questionText}
                        </div>
                        {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}
                                className="w-full h-[68px] bg-[#506d52] rounded-2xl flex justify-center items-center mb-2"
                            >
                                <div className="text-center text-[#e0ffd6] text-base font-normal font-['Inter'] leading-tight">
                                    {answerOption.answerText}
                                </div>
                            </button>
                        ))}
                        {showAnswer && (
                            <div className="text-xl text-white mt-4">
                                Richtige Antwort: {questions[currentQuestion].correctAnswer}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Bonusfragen;
