import React, { useState, useEffect } from 'react';
//Karten für Level 1
import questionMarkImage from './images/question_mark.png'; // Pfad zum Fragezeichen-Bild
import Bonusfragen from "./Bonusfragen";

import coin from "./images/Dollar Coin.png"

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
  const [zones, setZones] = useState([]);
  const [infoText, setInfoText] = useState(null); // Für das Info-Fenster
  const [errorMessage, setErrorMessage] = useState(''); // Fehlernachricht bei unzureichendem Geld

  useEffect(() => {
    // Initialisiere die Zonen basierend auf den Level-Daten
    if (level.zones) {
      setZones(level.zones.map(zone => ({
        id: zone.id,
        occupied: zone.occupied,
        building: zone.building,
        position: zone.position,
      })));
    }
  }, [level]);

  //Bauten Interagierbar machen
    const [isBuildingClicked, setIsBuildingClicked] = useState(null); // Initialize with null
    const handleBuildingClick = (zoneId) => {
      setIsBuildingClicked(prev => (prev === zoneId ? null : zoneId)); 
    };

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
        setErrorMessage('Fehler!');
        setTimeout(() => setErrorMessage(''), 2000); // Meldung nach 2 Sekunden entfernen
      }
    };
  
    const handleUpgrade = (zoneId) => {
      const zone = zones.find(z => z.id === zoneId);
      
      if (zone && zone.building && zone.building.level < 3) {
        const nextLevel = zone.building.level + 1;
        const nextUpgrade = zone.building.upgrades.find(u => u.level === nextLevel);
        
        if (money >= nextUpgrade.cost) {
          setMoney(money - nextUpgrade.cost); // Upgrade-Kosten abziehen
    
          // Erstelle das neue Upgrade-Gebäude-Objekt mit den aktualisierten Daten
          const upgradedBuilding = {
            ...zone.building,
            level: nextLevel,
            hp: nextUpgrade.hp,
            maxWaterLevel: nextUpgrade.maxWaterLevel,
            cost: nextUpgrade.cost,
            image: nextUpgrade.image // Bild des neuen Level-Upgrades setzen
          };
    
          // MaxWaterLevel erhöhen und Zone mit neuem Gebäude-Objekt aktualisieren
          setMaxWaterLevel(maxWaterLevel + nextUpgrade.maxWaterLevel);
          setZones(zones.map(z => z.id === zoneId ? { ...z, building: upgradedBuilding } : z));
        } else {
          setErrorMessage('Nicht genug Geld für das Upgrade!');
          setTimeout(() => setErrorMessage(''), 2000);
        }
      }
    };
    

  
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
        if (waterLevel > maxWaterLevel) return map24;
        if (waterLevel >= level.initialWaterLevel + 1.5) return map23;
        if (waterLevel >= level.initialWaterLevel + 1) return map22;
        return map21;
      case 3:
        if (waterLevel > maxWaterLevel) return map34;
        if (waterLevel >= level.initialWaterLevel + 1.5) return map33;
        if (waterLevel >= level.initialWaterLevel + 1) return map32;
        return map31;
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
        if (prev < maxWaterLevel) {
          return prev + 0.1; // Wasserstand steigt jede 10s um 0.1
        } else {
          return prev + 0.1;
        }
      });
    }, 9990); // Intervall: alle 10 Sekunden
  }

  return () => clearInterval(waterLevelInterval); // Wasserstand-Intervall aufräumen
}, [waveActive, maxWaterLevel]);

useEffect(() => {
  let timer;
  if(currentWaterLevel > maxWaterLevel && leben > 0 ){
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

  if(seconds <= 0 && leben > 0 && waveActive) {
    setLeben((prevLeben) => prevLeben - 10);
    setSeconds(5); 
  }


  if(leben<= 0){
    setWaveActive(false); // Welle stoppen, wenn das Maximum erreicht ist
    setCurrentLevel(5); // Spiel verloren
  }
}, [seconds, leben, waveActive]);
  
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
  return Math.max(0, Math.floor((maxWaterLevel - currentWaterLevel) * money * (1 + leben / 100))); // Abrunden auf die nächste ganze Zahl und sicherstellen, dass der Score nicht negativ ist
};



  return (
    
    <div>
     {/* Rendere Bonusfragen nur, wenn showBonusfragen true ist */}
     
     {showBonusfragen && (
                <Bonusfragen onBeendet={handleBonusFragenBeendet} onClose={() => setShowBonusfragen(false)} />
            )}
     {/* <Bonusfragen onBeendet={handleBonusFragenBeendet} onClose={() => setShowBonusfragen(false)} />  */}
    <div className="relative p-4 m-1 h-[580px] flex items-center justify-center text-white overflow-hidden">
      <img
        src={mapImage}
        alt="Map"
        className="absolute top-0 left-1/2 transform -translate-x-1/2 max-h-full"
        style={{ maxHeight: '100vh' }}
      />
      
      

      {/* Info-Fenster */}
      {infoText && (
          <div
          className="absolute top-20 left-1/2 transform -translate-x-1/2 p-6 border rounded shadow-lg z-50"
          style={{ backgroundColor: '#003A2C' }}
        >
            <p>{infoText}</p>
            <button className="mt-4 bg-gray-300 hover:bg-gray-400 text-white-700 py-2 px-4 rounded" onClick={() => setInfoText(null)}>Schließen</button>
          </div>
      )}

      {/* Die beiden Anzeigen für den aktuellen und den maximalen Wasserstand */}
      <div className="absolute top-4 right-4">
        
      
      
      <div className="flex items-center space-x-2 text-xl text-white"
      style ={{
      
      position: 'absolute',
      width:'145px',
      height:'20px',
      top: '0',
      right: '0',
      padding: '0px',
      backgroundColor: 'rgba(245, 198, 90, 0.7)',
      borderRadius: '8px', 
      border: '1px solid #F5C65A'
        
      }} >
        {/* Text */}
        <span>Geld: {money}</span>
        {/* Bild */}
        <img src={coin} alt="Geld" className="w-22 h-6" />
      </div>
    
        <div className="text-xl text-blue"
        style={{
          marginTop:'40px',
          marginRight: '240px',
          backgroundColor: 'rgba(1, 178, 254, 0.8)',
          borderRadius: '8px', 
          border: '1px solid #F5C65A',
          color:'#ffffff',

        }}
        >
          Pegel: {currentWaterLevel.toFixed(1)}m</div>
        <div className="text-xl text-white"
        
        style={{
          marginTop:'10px',
          marginRight: '240px',
          backgroundColor: 'rgba(97, 97, 97, 0.8)',
          borderRadius: '8px', 
          border: '1px solid #B8BBFF',
          color: '#FC3333',

        }}
        >max. Pegel: {maxWaterLevel}m</div>
      </div>
      
      {/* Aktuelle Welle-Anzeige */}
      <div className="absolute top-4 left-4">
        <div className="text-xl"
        style={{
          marginTop:'0px',
          marginRight: '180px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '8px', 
          border: '1px solid #B8BBFF',
          color: '#753333',

        }}>Welle: {currentWave}/3</div>
      </div>

      {/* Anzeige Welle starten */}
      {!waveActive && !dialogVisible && currentLevel < 4 && currentLevel < 5 && (
    <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
          <div className="text-4xl text-yellow-500 mb-4">Spiel gewonnen</div>
          <div className="text-2xl text-white mb-4">Score: {calculateScore()}</div>
          <button className="btn btn-secondary" onClick={onBackToDashboard}>Level Auswahl</button>
        </div>
      )}

      {/* Anzeige Spiel verloren */}
      {currentLevel === 5 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
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

{/* Bonusfragen button */}
{!bonusFragenBeendet && (
  <div className="absolute" style={{ top: 'calc(0rem + 40px)', right: '1rem' }}>
    <img
      src={questionMarkImage}
      alt="Fragezeichen"
      className="w-10 h-10 cursor-pointer"
      onClick={() => setShowBonusfragen(true)} // Öffne Bonusfragen
    />
  </div>
)}
    {/* Bauzonen */}
{zones.map(zone => (
  <div
    key={zone.id}
    className="fixed flex items-center justify-center"
    style={{
      left: zone.position.left,
      top: zone.position.top,
      width: '80px',
      height: '80px',
      backgroundColor: zone.occupied ? 'transparent' : 'rgba(128, 128, 128, 0.5)', // Grauer Platzhalter nur, wenn nicht belegt
      border: zone.occupied ? 'none' : '2px solid gray', // Graue Umrandung nur, wenn nicht belegt
    }}
    onDragOver={(e) => e.preventDefault()}
    onDrop={() => handleDrop(zone.id)}
  >
   {zone.building && (
  <div className="text-center z-50" onClick={() => handleBuildingClick(zone.id)}>
    <img src={zone.building.image} alt={zone.building.name} className="w-full h-full cursor-pointer" />
    <div className="text-sm font-bold text-black">Level: {zone.building.level}</div> {/* Level Anzeige */}
    {isBuildingClicked === zone.id && (
      <div className="mt-2">
        <button className="bg-blue-500 text-white py-1 px-2 rounded z-50" onClick={() => handleUpgrade(zone.id)}>Upgrade</button>
        <button className="bg-red-500 text-white py-1 px-2 rounded z-50" onClick={() => handleSell(zone.id)}>Verkaufen</button>
      </div>
    )}
  </div>
)}
            </div>
          ))}



    </div>

    
    {/* Gebäude und Drag and Drop */}
      {/* Fehlernachricht */}
      {errorMessage && <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white py-2 px-4 rounded-lg">{errorMessage}</div>}



{/* <div className="fixed flex items-center justify-center transform ">
  <BuildingList onSelectBuilding={handleDragStart} />
</div> */}


    

      
{/* Gebäude Drag and Drop */}
<div className="relative bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center items-center w-4/5">
  <div className="flex space-x-4"> {/* Container für die Elemente in einer horizontalen Reihe */}
    <BuildingList onSelectBuilding={handleDragStart} onShowInfo={handleShowInfo} />
  </div>
</div>

      
    </div>
  )
}



export default Spiel;