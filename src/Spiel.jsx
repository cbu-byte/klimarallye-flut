import React, { useState, useEffect } from 'react';
//Karten für Level 1
import questionMarkImage from './images/question_mark.png'; // Pfad zum Fragezeichen-Bild
import Bonusfragen from "./Bonusfragen";

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

import scientistImage from './images/scientist.png'; // Bild des Wissenschaftlers importieren


import BuildingList from './BuildingList'; // Importiere die BuildingList

function Spiel({ level, onBackToDashboard, onLevelComplete }) {
  
  const [menuOpen, setMenuOpen] = useState(false); // Menü-Status
  const [sandsackShown, setSandsackShown] = useState(false); // Sandsack-Anzeige
  const [waveActive, setWaveActive] = useState(false); // Ob die Welle aktiv ist
  const [currentWave, setCurrentWave] = useState(1); // Aktuelle Welle (1-3)
  const [currentLevel, setCurrentLevel] = useState(1); // Status des Spiels (Gewonnen/Verloren)
  const [currentWaterLevel, setCurrentWaterLevel] = useState(level.initialWaterLevel); // Anfangs Wasserstand
  const [maxWaterLevel, setMaxWaterLevel] = useState(level.maxWaterLevel); // Maximaler Wasserstand
  const [timer, setTimer] = useState(0); // Timer für die Welle
  const [seconds, setSeconds] = useState(5); //Countdown startet mit 5 Sekunden
  const [leben, setLeben] = useState(100) // Das Leben des Spielers
  
  const [money, setMoney] = useState(1000); // Geld für das Level
  const [dialogVisible, setDialogVisible] = useState(true); // Dialogfenster sichtbar
  const [currentDialogIndex, setCurrentDialogIndex] = useState(0); // Index für das Dialogsystem
  // Für die Objekte
  const [selectedBuilding, setSelectedBuilding] = useState(null); // Für Drag & Drop
  const [zones, setZones] = useState([
    { id: 1, occupied: false, building: null, position: { left: '30%', top: '40%' } },
    { id: 2, occupied: false, building: null, position: { left: '50%', top: '60%' } },
    { id: 3, occupied: false, building: null, position: { left: '70%', top: '50%' } },
  ]);
  const [infoText, setInfoText] = useState(null); // Für das Info-Fenster
  const [errorMessage, setErrorMessage] = useState(''); // Fehlernachricht bei unzureichendem Geld

  //bonusfragen
  const [showBonusfragen, setShowBonusfragen] = useState(false);
  const [bonusFragenBeendet, setBonusFragenBeendet] = useState(false); // Zustand, ob Bonusfragen beendet sind

  const handleBonusFragenBeendet = (richtigeAntworten) => {
    setMoney(money + richtigeAntworten * 500); // Füge 500 für jede richtige Antwort hinzu
    setBonusFragenBeendet(true); // Setze den Zustand auf beendet
    setShowBonusfragen(false); // Schließe das Bonusfragen-Fenster

  const lebenStyle = {
    width: `${leben}%`, // The width is based on the current life value
    backgroundColor: leben > 50 ? 'green' : leben > 20 ? 'orange' : 'red', // Green above 50%, orange above 20%, red below
    };
};

    // Dialogtexte aus dem Level
    const dialogs = level.dialogs || [];


    //Funktionen fürs bauen
    const handleDragStart = (building) => {
      setSelectedBuilding(building);
    };
    
    const handleDrop = (zoneId) => {
      if (!selectedBuilding) return;
  
      const zone = zones.find(z => z.id === zoneId);
      if (zone.building) return; // Zone ist bereits belegt
  
      if (money >= selectedBuilding.cost) {
        setMoney(money - selectedBuilding.cost); // Geld abziehen
        setZones(zones.map(z => z.id === zoneId ? { ...z, occupied: true, building: selectedBuilding } : z));
        setMaxWaterLevel(maxWaterLevel + selectedBuilding.maxWaterLevel); // Max Water Level erhöhen
      } else {
        setErrorMessage('Nicht genug Geld!');
        setTimeout(() => setErrorMessage(''), 2000); // Meldung nach 2 Sekunden entfernen
      }
    };
  
    const handleUpgrade = (zoneId) => {
      const zone = zones.find(z => z.id === zoneId);
      if (zone && zone.building && zone.building.level < 2) {
        const upgradeCost = zone.building.cost * 1.5;
        if (money >= upgradeCost) {
          setMoney(money - upgradeCost);
          const upgradedBuilding = {
            ...zone.building,
            level: zone.building.level + 1,
            maxWaterLevel: zone.building.maxWaterLevel + 5,
            image: zone.building.level === 1 ? upgradedSandsackImg : zone.building.image,
          };
          setZones(zones.map(z => z.id === zoneId ? { ...z, building: upgradedBuilding } : z));
        } else {
          setErrorMessage('Nicht genug Geld für das Upgrade!');
          setTimeout(() => setErrorMessage(''), 2000);
        }
      }
    }
  
    const handleSell = (zoneId) => {
      const zone = zones.find(z => z.id === zoneId);
      if (zone && zone.building) {
        setMoney(money + zone.building.cost / 2); // Halbes Geld zurück
        setMaxWaterLevel(maxWaterLevel - zone.building.maxWaterLevel); // Max Water Level reduzieren
        setZones(zones.map(z => z.id === zoneId ? { ...z, occupied: false, building: null } : z));
      }
    };
  
    const handleShowInfo = (building) => {
      setInfoText(building.info); // Setzt den Info-Text für das Gebäude
    };




  // Funktion, um die Karte basierend auf dem Wasserstand auszuwählen
  const getMapImage = (levelId, waterLevel, maxWaterLevel) => {
    switch (levelId) {
      case 1:
        if (waterLevel > maxWaterLevel) return map14;
        if (waterLevel >= level.initialWaterLevel + 0.5) return map13;
        if (waterLevel >= level.initialWaterLevel + 0.2) return map12;
        return map11;
      case 2:
        if (waterLevel >= level.initialWaterLevel + 1.5) return mapImage23;
        if (waterLevel >= level.initialWaterLevel + 1) return mapImage22;
        return mapImage2;
      case 3:
        if (waterLevel >= level.initialWaterLevel + 1.5) return mapImage33;
        if (waterLevel >= level.initialWaterLevel + 1) return mapImage32;
        return mapImage3;
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
            onLevelComplete(level.id + 1); // Fortschritt speichern
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
          if (prev < maxWaterLevel ) {
            return prev + 0.1; // Wasserstand steigt jede 10s um 0.1
          } else {
            /*setWaveActive(false); // Welle stoppen, wenn das Maximum erreicht ist
            setCurrentLevel(5); // Spiel verloren
            clearInterval(waterLevelInterval);
            */return prev + 0.1;
          }
        });
      }, 9990); // Intervall: alle 10 Sekunden
    }

    return () => clearInterval(waterLevelInterval); // Wasserstand-Intervall aufräumen
  }, [waveActive, maxWaterLevel]);

  useEffect(() => {
    let timer;
    if(currentWaterLevel > maxWaterLevel && leben > 0){
        timer = setInterval(() => {
          setSeconds((prevSeconds) => prevSeconds -1);
        }, 1000);
    }
    if(leben <= 0){
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [currentWaterLevel, maxWaterLevel, leben]);

  useEffect(() => {
    if(seconds <= 0 && leben > 0) {
      setLeben((prevLeben) => prevLeben - 10);
      setSeconds(5); 
    }
    if(leben<= 0){
      setWaveActive(false); // Welle stoppen, wenn das Maximum erreicht ist
      setCurrentLevel(5); // Spiel verloren
    }
  }, [seconds, leben, waveActive, ]);

  useEffect(() => {
    if(seconds <= 0 && leben === 0){
      setStartTimer(false);
    }

  }, [seconds]);
 

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



  return (
    
    <div>
        




     {/* Rendere Bonusfragen nur, wenn showBonusfragen true ist */}
     
     {showBonusfragen && (
                <Bonusfragen onBeendet={handleBonusFragenBeendet} onClose={() => setShowBonusfragen(false)} />
            )}
     {/* <Bonusfragen onBeendet={handleBonusFragenBeendet} onClose={() => setShowBonusfragen(false)} />  */}
    <div className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      <img
        src={mapImage}
        alt="Map"
        className="absolute top-0 left-1/2 transform -translate-x-1/2 max-h-full"
        style={{ maxHeight: '300vh' }}
      />
      
      {/* Gebäude und Drag and Drop */}
      {/* Fehlernachricht */}
      {errorMessage && <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white py-2 px-4 rounded-lg">{errorMessage}</div>}
{/* Bauzonen */}
{zones.map(zone => (
  <div
    key={zone.id}
    className="fixed flex items-center justify-center"
    style={{
      left: zone.position.left,
      top: zone.position.top,
      width: '100px',
      height: '100px',
      backgroundColor: zone.occupied ? 'transparent' : 'rgba(128, 128, 128, 0.5)', // Grauer Platzhalter nur, wenn nicht belegt
      border: zone.occupied ? 'none' : '2px solid gray', // Graue Umrandung nur, wenn nicht belegt
    }}
    onDragOver={(e) => e.preventDefault()}
    onDrop={() => handleDrop(zone.id)}
  >
    {zone.building && (
      <div className="text-center">
        <img src={zone.building.image} alt={zone.building.name} className="w-full h-full" />
        <button className="mt-2 bg-blue-500 text-white py-1 px-2 rounded" onClick={() => handleUpgrade(zone.id)}>Upgrade</button>
        <button className="mt-2 bg-red-500 text-white py-1 px-2 rounded" onClick={() => handleSell(zone.id)}>Verkaufen</button>
      </div>
    )}
  </div>
))}


<div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-between w-4/5 space-y-4">
  <BuildingList onSelectBuilding={handleDragStart} />
</div>


    

      

      {/* Leiste mit 8 Objekten durch die BuildingList-Komponente */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-between w-4/5">
        <BuildingList onSelectBuilding={handleDragStart} onShowInfo={handleShowInfo} />
      </div>

      {/* Info-Fenster */}
      {infoText && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-white p-6 border rounded shadow-lg z-50">
            <p>{infoText}</p>
            <button className="mt-4 bg-gray-300 hover:bg-gray-400 text-white-700 py-2 px-4 rounded" onClick={() => setInfoText(null)}>Schließen</button>
          </div>
      )}

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
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <button className="px-6 py-2 bg-[#4caf50] text-white font-semibold rounded-lg border border-[#388e3c] hover:bg-[#45a049] focus:outline-none focus:ring-2 focus:ring-[#2e7d32] focus:ring-opacity-50" onClick={startWave}>Welle starten</button>
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
  <div
    className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-90 z-50"
  >
    <div
      className="flex items-center rounded-lg p-4 shadow-lg"
      style={{
        backgroundColor: '#003A2C',
        width: '400px',  // Feste Breite
        height: '150px', // Feste Höhe
        borderRadius: '23px',
      }}
    >
      <img src={scientistImage} alt="Scientist" className="w-24 h-24 mr-4" />
      <div className="text-white flex-grow">
        <p>{dialogs[currentDialogIndex]}</p>
        <div className="mt-4 flex justify-between">
          <button
            className="btn text-white"
            onClick={handleDialogPrev}
            disabled={currentDialogIndex === 0}
          >
            Zurück
          </button>
          <button
            className="btn btn-secondary"
            onClick={handleDialogNext}
          >
            {currentDialogIndex === dialogs.length - 1 ? 'Schließen' : 'Weiter'}
          </button>
        </div>
      </div>
    </div>
  </div>
)}


 {/* Anzeige Welle starten */}
 {!waveActive && !dialogVisible && currentLevel < 4 && currentLevel < 5 && (
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <button className="px-6 py-2 bg-[#4caf50] text-white font-semibold rounded-lg border border-[#388e3c] hover:bg-[#45a049] focus:outline-none focus:ring-2 focus:ring-[#2e7d32] focus:ring-opacity-50" onClick={startWave}>Welle starten</button>
  </div>
)}

{/* Anzeige Welle 1/3 */}
<div className="absolute top-4 left-4">
  <div className="text-xl text-white">Welle: {currentWave}/3</div>
</div>

{!bonusFragenBeendet && (
  <div className="absolute" style={{ top: 'calc(4rem + 20px)', left: '4rem' }}>
    <img
      src={questionMarkImage}
      alt="Fragezeichen"
      className="w-8 h-8 cursor-pointer"
      onClick={() => setShowBonusfragen(true)} // Öffne Bonusfragen
    />
  </div>
)}




    </div>
    </div>
  );
}



export default Spiel;