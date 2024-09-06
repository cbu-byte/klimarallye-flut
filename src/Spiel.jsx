import React, { useState, useEffect } from 'react';
//Karten für Level 1
import map11 from "./Map/Level1/Map11";
import map12 from "./Map/Level1/Map12.jpg";
import map13 from "./Map/Level1/Map13.jpg";
import map14 from "./Map/Level1/Map14.jpg";
//Karten für Level 2
import map11 from "./Map/Level2/Map21";
import map12 from "./Map/Level2/Map22.jpg";
import map13 from "./Map/Level2/Map23.jpg";
import map14 from "./Map/Level2/Map24.jpg";
//Karten für Level 3
import map11 from "./Map/Level3/Map31";
import map12 from "./Map/Level3/Map32.jpg";
import map13 from "./Map/Level3/Map33.jpg";
import map14 from "./Map/Level3/Map34.jpg";
//import sandsackImage from './Sandsack.jpg'; // Importiere das Bild für den Sandsack
import scientistImage from './images/scientist.png'; // Bild des Wissenschaftlers importieren
//import mapImage12 from './level 2 stufe 2.jpg'; // Importiere das neue Bild







function Spiel({ level, onBackToDashboard, onLevelComplete   }) {
  const [menuOpen , setMenuOpen] = useState(false);
  const [sandsackShown, setSandsackShown] = useState(false); // Zustand für die Anzeige des Sandsack-Bildes
  const [waveActive, setWaveActive] = useState(false); 
  const [currentWave, setCurrentWave] = useState(1); // aktuelle Welle
  const [currentLevel, setCurrentLevel] = useState(1); // Für Sieg(4) und Niederlage(5) 
  const [currentWaterLevel, setCurrentWaterLevel] = useState(level.initialWaterLevel); // Anfangs Wasserstand Initialwert
  const [maxWaterLevel, setMaxWaterLevel] = useState(level.maxWaterLevel); // Maximaler Wasserstand Initialwert
  const [timer, setTimer] = useState(0); // Timer für Welle
  const [money, setMoney] = useState(1000); // Geld
  //const images = require.context('../../public/images', false);
  //const mapImage = images(`./MapL1N1.jpg`);

  //const [mapImage, setMapImage] = useState(level.map); // Map ${level.id}
  // Get the correct map image based on the selected level
  //const mapImage = level.id === 1 ? mapImage1 : level.map;

  const [dialogVisible, setDialogVisible] = useState(true); // Zustand für die Anzeige des Dialogfensters
  const [currentDialogIndex, setCurrentDialogIndex] = useState(0); // Index des aktuellen Textfensters

  const dialogs = [
    "Willkommen zum Spiel! Ich bin Ihr wissenschaftlicher Berater.",
    "Ihre Aufgabe ist es, die Fluten zu kontrollieren und die Stadt zu schützen.",
    "Nutzen Sie verschiedene Maßnahmen, um den Wasserstand zu regulieren.",
    "Viel Erfolg!"
  ];

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
  const mapImage = getMapImage(level.id, currentWaterLevel, maxWaterLevel);
  useEffect(() => {
    let timerInterval;
    if (waveActive) {
      timerInterval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            setWaveActive(false);
            if (currentWave === 3) {
              setCurrentLevel(4); // Spiel gewonnen
              onLevelComplete(level.id +1); // Fortschritt lokal oder im Backend speichern
            } else {
              setCurrentWave(prevWave => prevWave + 1);
              setTimer(0);
            }
            return 0;
          } else {
            return prev - 1;
          }
        });
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [waveActive, currentWave]);

 
  useEffect(() => { // Erhöht aktuellen Wasserstand alle 10s um 0.1
    let waterLevelInterval;
    if (waveActive) {
      waterLevelInterval = setInterval(() => {
        setCurrentWaterLevel(prev => {
          if (prev < maxWaterLevel) {
            return prev + 0.1;
          } else {
            setWaveActive(false);
            setCurrentLevel(5); // Game Over
            clearInterval(waterLevelInterval);
            return prev + 0.1;
          }
        });
      }, 9990); // 10 Sekunden 
    }

    return () => clearInterval(waterLevelInterval); // Setzt Effect auf inaktiv
  }, [waveActive, maxWaterLevel]);

  const toggleMenu = () => {
    if (sandsackShown) {
      setSandsackShown(false);
    } else {
      setMenuOpen(true);
    }
  };

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

  const startWave = () => {
    setWaveActive(true);
    setTimer(30); // 30 Sekunden Platzhalter
  };

  const handleDialogNext = () => {
    if (currentDialogIndex < dialogs.length - 1) {
      setCurrentDialogIndex(currentDialogIndex + 1);
    } else {
      setDialogVisible(false);
    }
  };

  const handleDialogPrev = () => {
    if (currentDialogIndex > 0) {
      setCurrentDialogIndex(currentDialogIndex - 1);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      <img
        src={mapImage}
        alt="Map"
        className="absolute top-0 left-1/2 transform -translate-x-1/2 max-h-full"
        style={{ maxHeight: '300vh' }}
      />

      {currentWaterLevel >= 2 && (
        <div className="absolute top-0 left-0 w-full h-full">
          <img src={mapImage12} alt="High Water Level" className="w-full h-full object-cover" />
        </div>
      )}
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

      {!waveActive && !dialogVisible && currentLevel < 4 && currentLevel < 5 && ( 
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          <button className="btn btn-primary" onClick={startWave}>Welle starten</button>
        </div>
      )}

      {waveActive && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          <div className="text-xl text-white">Zeit: {timer}s</div>
        </div>
      )}

      {currentLevel === 4 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-4xl text-yellow-500 mb-4">Spiel gewonnen</div>
          <button className="btn btn-secondary" onClick={onBackToDashboard}>Level Auswahl</button>
        </div>
      )}

      {currentLevel === 5 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-3xl text-red-500 mb-4">Game Over</div>
          <button className="btn btn-secondary" onClick={onBackToDashboard}>Level Auswahl</button>
        </div>
      )}

   {/* GEÄNDERT: Dialog in der Mitte der Karte anzeigen */}
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
