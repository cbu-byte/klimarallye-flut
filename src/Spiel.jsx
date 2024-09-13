import React, { useState, useEffect } from 'react';
//Karten für Level 1
import map11 from "./Map/Level1/Map11.jpg";
import map12 from "./Map/Level1/Map12.jpg";
import map13 from "./Map/Level1/Map13.jpg";
import map14 from "./Map/Level1/Map14.jpg";
//Karten für Level 2
import map21 from "./Map/Level2/Map21.jpg";
import map22 from "./Map/Level2/Map22.jpg";
import map23 from "./Map/Level2/Map23.jpg";
import map24 from "./Map/Level2/Map24.jpg";
//Karten für Level 3
import map31 from "./Map/Level3/Map31.jpg";
import map32 from "./Map/Level3/Map32.jpg";
import map33 from "./Map/Level3/Map33.jpg";
import map34 from "./Map/Level3/Map34.jpg";
//import sandsackImage from './Sandsack.jpg'; // Importiere das Bild für den Sandsack
import scientistImage from './images/scientist.png'; // Bild des Wissenschaftlers importieren
//import mapImage12 from './level 2 stufe 2.jpg'; // Importiere das neue Bild

function Spiel({ level, onBackToDashboard, onLevelComplete }) {
  const [menuOpen, setMenuOpen] = useState(false); // Menü-Status
  const [sandsackShown, setSandsackShown] = useState(false); // Sandsack-Anzeige
  const [waveActive, setWaveActive] = useState(false); // Ob die Welle aktiv ist
  const [currentWave, setCurrentWave] = useState(1); // Aktuelle Welle (1-3)
  const [currentLevel, setCurrentLevel] = useState(1); // Status des Spiels (Gewonnen/Verloren)
  const [currentWaterLevel, setCurrentWaterLevel] = useState(level.initialWaterLevel); // Anfangs Wasserstand
  const [maxWaterLevel, setMaxWaterLevel] = useState(level.maxWaterLevel); // Maximaler Wasserstand
  const [timer, setTimer] = useState(0); // Timer für die Welle
  const [money, setMoney] = useState(1000); // Geld für das Level
  const [dialogVisible, setDialogVisible] = useState(true); // Dialogfenster sichtbar
  const [currentDialogIndex, setCurrentDialogIndex] = useState(0); // Index für das Dialogsystem

    // Dialogtexte aus dem Level
    const dialogs = level.dialogs || [];

  // Funktion, um die Karte basierend auf dem Wasserstand auszuwählen
  const getMapImage = (levelId, waterLevel, maxWaterLevel) => {
    switch (levelId) {
      case 1:
        if (waterLevel > maxWaterLevel) return map14;
        if (waterLevel >= level.initialWaterLevel + 0.5) return map13;
        if (waterLevel >= level.initialWaterLevel + 0.2) return map12;
        return map11;
      // case 2:
      //   if (waterLevel >= level.initialWaterLevel + 1.5) return mapImage23;
      //   if (waterLevel >= level.initialWaterLevel + 1) return mapImage22;
      //   return mapImage2;
      // case 3:
      //   if (waterLevel >= level.initialWaterLevel + 1.5) return mapImage33;
      //   if (waterLevel >= level.initialWaterLevel + 1) return mapImage32;
      //   return mapImage3;
      default:
        return map11;
    }
  };
  
  // Karte wird basierend auf dem aktuellen Level und Wasserstand ausgewählt
  const mapImage = getMapImage(level.id, currentWaterLevel, maxWaterLevel);

  // Effekt zur Steuerung des Wellentimers
  useEffect(() => {
    let timerInterval;
    if (waveActive) {
      timerInterval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            setWaveActive(false); // Welle beendet
            if (currentWave === 3) {
              setCurrentLevel(4); // Spiel gewonnen nach der 3. Welle
              onLevelComplete(level.id + 1); // Fortschritt speichern
            } else {
              setMoney(prevMoney => prevMoney + 500); // 500 Geld hinzufügen
              setCurrentWave(prevWave => prevWave + 1); // Nächste Welle
              setTimer(0); // Timer zurücksetzen
            }
            return 0;
          } else {
            return prev - 1; // Timer läuft weiter
          }
        });
      }, 1000); // Timer-Intervall: jede Sekunde
    }

    return () => clearInterval(timerInterval); // Timer aufräumen
  }, [waveActive, currentWave]);

  // Effekt zur Erhöhung des Wasserstandes während der Welle
  useEffect(() => {
    let waterLevelInterval;
    if (waveActive) {
      waterLevelInterval = setInterval(() => {
        setCurrentWaterLevel(prev => {
          if (prev < maxWaterLevel) {
            return prev + 0.1; // Wasserstand steigt jede 10s um 0.1
          } else {
            setWaveActive(false); // Welle stoppen, wenn das Maximum erreicht ist
            setCurrentLevel(5); // Spiel verloren
            clearInterval(waterLevelInterval);
            return prev + 0.1;
          }
        });
      }, 9990); // Intervall: alle 10 Sekunden
    }

    return () => clearInterval(waterLevelInterval); // Wasserstand-Intervall aufräumen
  }, [waveActive, maxWaterLevel]);

   // const handleMenuItemClick = (menuItem) => {
  //   switch (menuItem) {
  //     case 'Biberdamm':
  //       console.log('Biberdamm ausgewählt');
  //       break;
  //     case 'Staudamm':
  //       console.log('Staudamm ausgewählt');
  //       break;
  //     case 'Sandsack':
  //       console.log('Sandsack ausgewählt');
  //       setSandsackShown(true);
  //       break;
  //     default:
  //       break;
  //   }
  //   setMenuOpen(false);
  // };


  // Funktion, um die Welle zu starten
  const startWave = () => {
    setWaveActive(true);
    setTimer(30); // Platzhalter für 30 Sekunden Wellen-Timer
  };

  // Funktion zur Steuerung des Dialogsystems (nächster Dialog)
  const handleDialogNext = () => {
    if (currentDialogIndex < dialogs.length - 1) {
      setCurrentDialogIndex(currentDialogIndex + 1); // Nächster Dialog
    } else {
      setDialogVisible(false); // Dialog schließen
    }
  };

  // Funktion zur Steuerung des Dialogsystems (vorheriger Dialog)
  const handleDialogPrev = () => {
    if (currentDialogIndex > 0) {
      setCurrentDialogIndex(currentDialogIndex - 1); // Vorheriger Dialog
    }
  };

  // Berechnung des Scores
  const calculateScore = () => {
    return Math.max(0, Math.floor((maxWaterLevel - currentWaterLevel) * money)); // Abrunden auf die nächste ganze Zahl und sicherstellen, dass der Score nicht negativ ist
  };

  {/*     
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
        <button className="btn btn-square" onClick={toggleMenu}>
          {menuOpen && !sandsackShown ? 'Schließen' : 'Menü öffnen'}
        </button>
        {menuOpen && (
          <div className="menu bg-gray-800 bg-opacity-70 p-4 rounded-md">
            <ul>
              <li>
                <button
                  className="menu-btn biberdamm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                  onClick={() => handleMenuItemClick('Biberdamm')}
                >
                  Biberdamm
                </button>
              </li>
              <li>
                <button
                  className="menu-btn staudamm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                  onClick={() => handleMenuItemClick('Staudamm')}
                >
                  Staudamm
                </button>
              </li>
              <li>
                <button
                  className="menu-btn sandsack bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                  onClick={() => handleMenuItemClick('Sandsack')}
                >
                  Sandsack
                </button>
              </li>
            </ul>
          </div>
        )}
      </div> */}

  return (
    // Map
    <div className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      <img
        src={mapImage}
        alt="Map"
        className="absolute top-0 left-1/2 transform -translate-x-1/2 max-h-full"
        style={{ maxHeight: '300vh' }}
      />

      {/* {currentWaterLevel >= 2 && (
        <div className="absolute top-0 left-0 w-full h-full">
          <img src={mapImage12} alt="High Water Level" className="w-full h-full object-cover" />
        </div>
      )} */}
{/*     
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
        <button className="btn btn-square" onClick={toggleMenu}>
          {menuOpen && !sandsackShown ? 'Schließen' : 'Menü öffnen'}
        </button>
        {menuOpen && (
          <div className="menu bg-gray-800 bg-opacity-70 p-4 rounded-md">
            <ul>
              <li>
                <button
                  className="menu-btn biberdamm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                  onClick={() => handleMenuItemClick('Biberdamm')}
                >
                  Biberdamm
                </button>
              </li>
              <li>
                <button
                  className="menu-btn staudamm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                  onClick={() => handleMenuItemClick('Staudamm')}
                >
                  Staudamm
                </button>
              </li>
              <li>
                <button
                  className="menu-btn sandsack bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                  onClick={() => handleMenuItemClick('Sandsack')}
                >
                  Sandsack
                </button>
              </li>
            </ul>
          </div>
        )}
      </div> */}

      {sandsackShown && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img src={sandsackImage} alt="Sandsack" className="w-24 h-24" />
        </div>
      )}

      {/* Die beiden Anzeigen für den aktuellen und den maximalen Wasserstand */}
      <div className="absolute top-4 right-4">
        <div className="text-xl text-white">Geld: {money}$</div>
        <div className="text-xl text-white">akt. Wasserstand: {currentWaterLevel.toFixed(1)}m</div>
        <div className="text-xl text-white">max. Wasserstand: {maxWaterLevel}m</div>
      </div>

      {/* Aktuelle Welle-Anzeige */}
      <div className="absolute top-4 left-4">
        <div className="text-xl text-white">Welle: {currentWave}/3</div>
      </div>

      {/* Anzeige Welle starten */}
      {!waveActive && !dialogVisible && currentLevel < 4 && currentLevel < 5 && ( 
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          <button className="btn btn-primary" onClick={startWave}>Welle starten</button>
        </div>
      )}

      {/* Anzeige Zeit */}
      {waveActive && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          <div className="text-xl text-white">Zeit: {timer}s</div>
        </div>
      )}

      {/* Anzeige Spiel gewonnen */}
      {currentLevel === 4 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-4xl text-yellow-500 mb-4">Spiel gewonnen</div>
          <div className="text-2xl text-white mb-4">Score: {calculateScore()}</div>
          <button className="btn btn-secondary" onClick={onBackToDashboard}>Level Auswahl</button>
        </div>
      )}

      {/* Anzeige Spiel verloren */}
      {currentLevel === 5 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-3xl text-red-500 mb-4">Game Over</div>
          <button className="btn btn-secondary" onClick={onBackToDashboard}>Level Auswahl</button>
        </div>
      )}

   {/* Dialog (Geschichte) */}
   {dialogVisible && (
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-90 p-4 rounded-lg shadow-lg flex items-center">
    <img src={scientistImage} alt="Scientist" className="w-24 h-24 mr-4" />
    <div className="text-white">
      <p className="text-white">{dialogs[currentDialogIndex]}</p>
      <div className="mt-4 flex justify-between">
        <button
          className="btn btn-secondary text-white"
          onClick={handleDialogPrev}
          disabled={currentDialogIndex === 0}
        >
          Zurück
        </button>
        <button
          className="btn btn-secondary text-white"
          onClick={handleDialogNext}
        >
          {currentDialogIndex === dialogs.length - 1 ? 'Schließen' : 'Weiter'}
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}



export default Spiel;











