import React, { useState, useEffect } from 'react';
import mapImage from './Map.jpg';
import sandsackImage from './Sandsack.jpg'; // Importiere das Bild für den Sandsack

function Map() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sandsackShown, setSandsackShown] = useState(false); // Zustand für die Anzeige des Sandsack-Bildes
  const [waveActive, setWaveActive] = useState(false);
  const [currentWave, setCurrentWave] = useState(1);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentWaterLevel, setCurrentWaterLevel] = useState(1); // Anfangs Wasserstand Platzhalter
  const [maxWaterLevel, setMaxWaterLevel] = useState(1.4); //maximaler Wasserstand ohne Maßnahmen  Platzhalter
  const [timer, setTimer] = useState(0);

  //
  useEffect(() => {
    let timerInterval;
    if (waveActive) {
      timerInterval = setInterval(() => { // setInterval: Reduziert den Timer jede Sekunde
        setTimer(prev => {
          if (prev <= 1) {
            setWaveActive(false); // relevant dafür, ob timer angezeigt wird
            if (currentWave === 3) {
              setCurrentLevel(4); // Spiel gewonnen
            } else {
              setCurrentWave(prevWave => prevWave + 1); // erhöht aktuelle Welle
              setTimer(0);
            }
            return 0;
          } else {
            return prev - 1; // Sekunde anzeige innerhalb des Timers
          }
        });
      }, 1000); // 1000 millisekunden == 1 Seknude
    }

    return () => clearInterval(timerInterval); //setzt Effect auf inaktiv
  }, [waveActive, currentWave]);

  useEffect(() => { // erhöht aktuellen Wasserstand alle 10s um 0.1
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

    return () => clearInterval(waterLevelInterval); //setzt Effect auf inaktiv
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

      {/* Die beiden anzeigen für den aktuellen. und den maximalen Wasserstand */}
      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <div className="text-xl">Aktueller Wasserstand: {currentWaterLevel.toFixed(1)}m</div>
        <div className="text-xl">Maximaler Wasserstand: {maxWaterLevel}m</div>
      </div>

      {/* aktuelle Welle anzeige */}
      <div style={{ position: 'absolute', top: '10px', left: '10px' }}> 
        <div className="text-xl">Aktuelle Welle: {currentWave}/3</div>
      </div>

      {!waveActive && currentLevel < 4 && currentLevel < 5 && ( //Welle starten Button
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

      {currentLevel === 5 && ( //Spielende 
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-red-500">
          Game Over
        </div>
      )}
    </div>
  );
}

export default Map;
