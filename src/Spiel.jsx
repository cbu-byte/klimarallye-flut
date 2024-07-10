import React, { useState, useEffect } from 'react';
import map11 from "./Map11.jpg";
import map12 from "./Map12.jpg";
import map13 from "./Map13.jpg";
import map14 from "./Map14.jpg";
import sandsackImage from './Sandsack.jpg'; // Importiere das Bild für den Sandsack
//import mapImage12 from './level 2 stufe 2.jpg'; // Importiere das neue Bild







function Spiel({ level }) {
  const [menuOpen , setMenuOpen] = useState(false);
  const [sandsackShown, setSandsackShown] = useState(false); // Zustand für die Anzeige des Sandsack-Bildes
  const [waveActive, setWaveActive] = useState(false);
  const [currentWave, setCurrentWave] = useState(1);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentWaterLevel, setCurrentWaterLevel] = useState(level.initialWaterLevel); // Anfangs Wasserstand Platzhalter
  const [maxWaterLevel, setMaxWaterLevel] = useState(level.maxWaterLevel); // Maximaler Wasserstand ohne Maßnahmen Platzhalter
  const [timer, setTimer] = useState(0); // Timer für Welle
  const [money, setMoney] = useState(1000); // Geld
  //const images = require.context('../../public/images', false);
  //const mapImage = images(`./MapL1N1.jpg`);

  //const [mapImage, setMapImage] = useState(level.map); // Map ${level.id}
  // Get the correct map image based on the selected level
  //const mapImage = level.id === 1 ? mapImage1 : level.map;
  const getMapImage = (levelId, waterLevel, maxWaterLevel) => {
    switch (levelId) {
      case 1:
        if (!(waterLevel <= maxWaterLevel)) return map14;
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
      timerInterval = setInterval(() => { // setInterval: Reduziert den Timer jede Sekunde
        setTimer(prev => {
          if (prev <= 1) {
            setWaveActive(false); // Relevant dafür, ob Timer angezeigt wird
            if (currentWave === 3) {
              setCurrentLevel(4); // Spiel gewonnen
            } else {
              setCurrentWave(prevWave => prevWave + 1); // Erhöht aktuelle Welle
              //setCurrentWaterLevel(level.initialWaterLevel); // Setzt den Wasserstand auf den Initialwert zurück
              setTimer(0);
            }
            return 0;
          } else {
            return prev - 1; // Sekundenanzeige innerhalb des Timers
          }
        });
      }, 1000); // 1000 Millisekunden == 1 Sekunde
    }

    return () => clearInterval(timerInterval); // Setzt Effect auf inaktiv
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

  const handleMenuItemClick = (menuItem) => {
    switch (menuItem) {
      case 'Biberdamm':
        console.log('Biberdamm ausgewählt');
        break;
      case 'Staudamm':
        console.log('Staudamm ausgewählt');
        break;
      case 'Sandsack':
        console.log('Sandsack ausgewählt');
        setSandsackShown(true);
        break;
      default:
        break;
    }
    setMenuOpen(false);
  };

  const startWave = () => {
    setWaveActive(true);
    setTimer(30); // 30 Sekunden Platzhalter
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

      {!waveActive && currentLevel < 4 && currentLevel < 5 && (
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
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-yellow-500">
          Spiel gewonnen
        </div>
      )}

      {currentLevel === 5 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-red-500">
          Game Over
        </div>
      )}
    </div>
  );
}

export default Spiel;
