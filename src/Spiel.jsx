// Spiel.jsx
import React, { useState, useEffect } from 'react';
import mapImage1 from './Map.jpg'; // Importiere Map.jpg für Level 1
import sandsackImage from './Sandsack.jpg'; // Importiere das Bild für den Sandsack

function Spiel({ level }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sandsackShown, setSandsackShown] = useState(false); // Zustand für die Anzeige des Sandsack-Bildes
  const [waveActive, setWaveActive] = useState(false);
  const [currentWave, setCurrentWave] = useState(1);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentWaterLevel, setCurrentWaterLevel] = useState(level.initialWaterLevel); // Anfangs Wasserstand Platzhalter
  const [maxWaterLevel, setMaxWaterLevel] = useState(level.maxWaterLevel); // Maximaler Wasserstand ohne Maßnahmen Platzhalter
  const [timer, setTimer] = useState(0); // Timer für Welle
  const [money, setMoney] = useState(0); // Geld

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
              setCurrentWaterLevel(level.initialWaterLevel); // Setzt den Wasserstand auf den Initialwert zurück
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
          if (prev + 0.1 <= maxWaterLevel) {
            return prev + 0.1;
          } else {
            setWaveActive(false);
            setCurrentLevel(5); // Game Over
            clearInterval(waterLevelInterval);
            return prev;
          }
        });
      }, 10000); // 10 Sekunden 
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

  // Get the correct map image based on the selected level
  const mapImage = level.id === 1 ? mapImage1 : level.map;

  return (
    <div
      className="hero min-h-screen flex items-center justify-center"
      style={{
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <img
        src={mapImage}
        alt="Background"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(90deg)',
          width: 'auto',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <button className="btn btn-square" onClick={toggleMenu}>
            {menuOpen && !sandsackShown ? 'Schließen' : 'Menü öffnen'}
          </button>
          {menuOpen && (
            <div className="menu">
              <ul>
                <li>
                  <button className="menu-btn biberdamm" onClick={() => handleMenuItemClick('Biberdamm')}>
                    Biberdamm
                  </button>
                </li>
                <li>
                  <button className="menu-btn staudamm" onClick={() => handleMenuItemClick('Staudamm')}>
                    Staudamm
                  </button>
                </li>
                <li>
                  <button className="menu-btn sandsack" onClick={() => handleMenuItemClick('Sandsack')}>
                    Sandsack
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {sandsackShown && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <img src={sandsackImage} alt="Sandsack" style={{ width: '100px', height: '100px' }} />
        </div>
      )}

      {/* Die beiden Anzeigen für den aktuellen und den maximalen Wasserstand */}
      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <div className="text-xl">Geld: {money}m</div>
        <div className="text-xl">akt. Wasserstand: {currentWaterLevel.toFixed(1)}m</div>
        <div className="text-xl">max. Wasserstand: {maxWaterLevel}m</div>
      </div>

      {/* Aktuelle Welle-Anzeige */}
      <div style={{ position: 'absolute', top: '10px', left: '10px' }}> 
        <div className="text-xl">Welle: {currentWave}/3</div>
      </div>

      {!waveActive && currentLevel < 4 && currentLevel < 5 && ( // Welle starten Button
        <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)' }}>
          <button className="btn btn-primary" onClick={startWave}>Welle starten</button>
        </div>
      )}

      {waveActive && ( // Timer
        <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)' }}>
          <div className="text-xl">Zeit: {timer}s</div>
        </div>
      )}

      {currentLevel === 4 && ( // Spiel gewonnen
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-green-500">
          Spiel gewonnen
        </div>
      )}

      {currentLevel === 5 && ( // Spielende 
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-red-500">
          Game Over
        </div>
      )}
    </div>
  );
}

export default Spiel;
