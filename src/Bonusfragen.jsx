import React, { useState, useEffect } from 'react';
import Bega from './images/Bega.png';
import BackgroundImage from './images/Background.png'; 
const Bonusfragen = ({ onBeendet, onClose }) => {
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
            questionText: 'Wo ist die Quelle der Bega?',
            answerOptions: [
                { answerText: 'Östlich von Lemgo', isCorrect: true },
                { answerText: 'Im Nationalpark Harz', isCorrect: false },
                { answerText: 'Im Blomberger Stadtwald', isCorrect: false },
            ],
            correctAnswer: 'Leicht Östlich von Lemgo'
        },

        {
            questionText: 'Durch welche Stadt fließt die Bega nicht?',
            answerOptions: [
                { answerText: 'Bad Salzuflen.', isCorrect: false },
                { answerText: 'Lemgo.', isCorrect: false },
                { answerText: 'Paderborn.', isCorrect: true },
            ],
            correctAnswer: 'Paderborn.'
        },
        {
            questionText: 'Wann wurde das Hochwasserrückhaltebecken der Bega Gebaut?',
            answerOptions: [
                { answerText: '1950 bis 2000.', isCorrect: false },
                { answerText: '1978 bis 2010.', isCorrect: true },
                { answerText: '1990 bis 2018.', isCorrect: false },
            ],
            correctAnswer: 'Das Hochwasserrückhaltebecken wurde von 1978 bis 2010 gebaut.'
        },
        {
            questionText: 'Wie Viel wasser kann das Hochwasser Rückhaltebecken speichern?',
            answerOptions: [
                { answerText: 'Ca 2.582.000 m³.', isCorrect: true },
                { answerText: 'Ca 2.655.000 m³.', isCorrect: false },
                { answerText: 'Ca 2.743.000 m³.', isCorrect: false },
            ],
            correctAnswer: 'Ungefähr 2.582.000 m³ Wasser'
        },
        {
            questionText: 'Was für gefahren bringt die Bega für Anwohner mit sich?',
            answerOptions: [
                { answerText: 'Grundwasser Verschmutzung.', isCorrect: false },
                { answerText: 'Ertrinken.', isCorrect: false },
                { answerText: 'Hochwasser.', isCorrect: true },
            ],
            correctAnswer: 'Es besteht eine gewisse Gefahr für Hochwasser.'
        },
        {
            questionText: 'Wofür wird die Bega Genutzt?',
            answerOptions: [
                { answerText: 'Freizeitsport.', isCorrect: true },
                { answerText: 'Kiesabbau.', isCorrect: false },
                { answerText: 'Stromerzeugung.', isCorrect: false },
            ],
            correctAnswer: 'Die Bega wird von vielen für Freizeitsport genutzt.'
        },
        {
            questionText: 'Was kann eine mögliche Ursache von Hochwasser sein?',
            answerOptions: [
                { answerText: 'Starkregen.', isCorrect: true },
                { answerText: 'Erdrutsche.', isCorrect: false },
                { answerText: 'Fischfang.', isCorrect: false },
            ],
            correctAnswer: 'Starkregen ist eine häufige Ursache von Hochwasser.'
        },
        {
            questionText: 'Was bewirkt eine Fluss Renaturierung nicht?',
            answerOptions: [
                { answerText: 'Reduzierung des Hochwasserrisikos.', isCorrect: false },
                { answerText: 'Einschränkung des Tierlebensraum.', isCorrect: true },
                { answerText: 'Abbau umweltschädlicher Stoffe.', isCorrect: false },
            ],
            correctAnswer: 'Der Lebensraum der Tiere wird nicht gestört.'
        },
        {
            questionText: 'Wozu nutzt man Sandsäcke nicht?',
            answerOptions: [
                { answerText: 'Um eine Barriere zu errichten.', isCorrect: false },
                { answerText: 'Um überschüssiges Wasser aufzusaugen.', isCorrect: false },
                { answerText: 'Um Fluchtwege zu bauen.', isCorrect: true },
            ],
            correctAnswer: 'Man sollte Sandsäcke nicht zum Bau von Fluchwegen nutzen.'
        },{
            questionText: 'Wozu wird ein Hochwasserrückhaltebecken genutzt?',
            answerOptions: [
                { answerText: 'Es Speichert überschüssiges Wasser.', isCorrect: true },
                { answerText: 'Es verlängert den Fluss.', isCorrect: false },
                { answerText: 'Es fügt dem FLuss beim Austrocknen Wasser hinzu.', isCorrect: false },
            ],
            correctAnswer: 'Es wird zur SPeicherung von überschüssigem Genutzt.'
        },
        {
            questionText: 'Warum begradigt man einen Fluss?',
            answerOptions: [
                { answerText: 'Nutzbarkeit für Schiffahrt.', isCorrect: true },
                { answerText: 'Verringerung der Fließgeschwindigkeit.', isCorrect: false },
                { answerText: 'Nutzbarkeit für Landwirtschaft.', isCorrect: false },
            ],
            correctAnswer: 'Flüsse werden begradigt um die Schiffahrt zu erleichtern.'
        },
        {
            questionText: 'WIe kann man sich bei Hochwasser zuhause schützen?',
            answerOptions: [
                { answerText: 'Wasser mit leeren flaschen auffangen.', isCorrect: false },
                { answerText: 'Im Keller verstecken.', isCorrect: false },
                { answerText: 'Mit Sandsäcken die Türen Blockieren.', isCorrect: true },
            ],
            correctAnswer: 'Man sollte Sandsäcke nutzen um eingänge zu Blockieren.'
        },
        {
            questionText: 'Wieso nutzt man Sand gegen Wasser?',
            answerOptions: [
                { answerText: 'Er ist besonders Leicht.', isCorrect: false },
                { answerText: 'Er saugt Große Mengen masser auf.', isCorrect: true },
                { answerText: 'Er kann Schwimmen.', isCorrect: false },
            ],
            correctAnswer: 'Sand kann besonders viel Wasser aufnehmen.'
        },
        {
            questionText: 'Wie viele Hochwasserstufen gibt es?',
            answerOptions: [
                { answerText: '3.', isCorrect: false },
                { answerText: '4.', isCorrect: true },
                { answerText: '5.', isCorrect: false },
            ],
            correctAnswer: 'Es gibt 4 Hochwasserstufen.'
        },
        
    ];
    
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        if (showScore) {
            // Zeige das Ergebnisfenster für 4 Sekunden an und schließe danach
            const timer = setTimeout(() => {
                onClose(); // Schließe die Bonusfragen
            }, 4000); // 4 Sekunden

            return () => clearTimeout(timer); // Timer aufräumen, wenn der Komponent neu geladen wird
        }
    }, [showScore, onClose]);

    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1); // Zähle die richtigen Antworten
        }
        setShowAnswer(true);
        setTimeout(() => {
            setShowAnswer(false);
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < questions.length) {
                setCurrentQuestion(nextQuestion);
            } else {
                setShowScore(true);
                onBeendet(score); // Übergebe die Anzahl der richtigen Antworten an die Hauptkomponente
            }
        }, 2000); // 2 Sekunden wird die Lösung angezeigt
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${BackgroundImage})` }}></div>

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