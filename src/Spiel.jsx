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
import coin from './images/Dollar_Coin.png';

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
        setErrorMessage('Nicht genug Geld!');
        setTimeout(() => setErrorMessage(''), 2000); // Meldung nach 2 Sekunden entfernen
      }
    };
  
    const handleUpgrade = (zoneId) => {
      const zone = zones.find(z => z.id === zoneId);
      if (zone && zone.building && zone.building.level < 3) {
        const upgradeCost = zone.building.cost * 1.5;
        if (money >= upgradeCost) {
          setMoney(money - upgradeCost);
          const upgradedBuilding = {
            ...zone.building,
            level: zone.building.level + 1,
            maxWaterLevel: zone.building.maxWaterLevel + 5,
    
            //image: zone.building.level === 1 ? upgradedSandsackImg : zone.building.image,
          };
          setMaxWaterLevel(maxWaterLevel => maxWaterLevel + 5);
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
          return prev + 0.3; // Wasserstand steigt jede s um 0.3
        } else {
          return prev + 0.3;
        }
      });
    }, 1000); // Intervall: jede Sekunde
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
    setTimer(90); // Platzhalter für 90 Sekunden Wellen-Timer
  };

  useEffect(() => {
    let moneyInterval;
    
    if (waveActive) {
      moneyInterval = setInterval(() => {
        setMoney(prevMoney => prevMoney + 80); // Verwende prevMoney, um den vorherigen Stand zu nutzen
      }, 5000); // Intervall von 5 Sekunden
    }
  
    // Aufräumen des Intervalls, wenn die Welle aufhört
    return () => clearInterval(moneyInterval);
  }, [waveActive]); // Abhängigkeit von waveActive, um das Intervall zu starten/beenden

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
      
    
    
    <div className="flex items-center space-x-4 text-xl "
    style ={{
    marginRight: "-60px",
    fontFamily: '"Papyrus"',
    fontWeight: 'bold',
    fontSize: "22px",
    color: '#BFC205',
    position: 'absolute',
    width:'200px',
    height:'30px',
    top: '0',
    right: '0',
    padding: '9px',
    backgroundColor: 'rgba(121, 121, 121, 0.9)',
    borderRadius: '12px', 
    border: '1px solid #000000',
    
      
    }} >
      {/* Text */}
      Geld: {money}
      {/* Bild */}
      <img src={coin} alt="Geld" className="w-22 h-7" />
    </div>
  
      <div className="text-xl"
      style={{
        //fontFamily: '"Times New Roman"',
        fontWeight: 'normal',
        fontSize: "20px",
        marginTop:'50px',
        marginRight: '240px',
        marginLeft:"15px",
        //background: 'linear-gradient(0deg, rgba(1, 178, 254, 0.8), rgba(245, 182, 66, 0.8))',
        backgroundColor: 'rgba(173, 175, 247, 0.8)',
        borderRadius: '8px', 
        border: '0px solid #F5C65A',
        color:'#132c52',
        padding: "4px",
      }}
      >
        Pegel: {currentWaterLevel.toFixed(1)}m</div>
      <div className="text-xl"
      
      style={{
        fontSize: "19px",
        fontWeight: "normal",
        marginTop:'2px',
        marginRight: '240px',
        marginLeft:"15px",
        //background: 'linear-gradient(0deg, rgba(19, 44, 82, 0.8), rgba(1, 178, 254, 0.8))',
        backgroundColor: 'rgba(19, 44, 82, 0.8)',
        borderRadius: '8px', 
        border: '0px solid #B8BBFF',
        color: '#D6D7FF',
        padding: "4px",

      }}
      >max. Pegel: {maxWaterLevel}m</div>
    </div>
    
    {/* Aktuelle Welle-Anzeige */}
    <div className="absolute top-4 left-4">
      <div className="text-xl"
      style={{
        marginTop:'0px',
        marginLeft: '0px',
        backgroundColor: 'rgba(121, 121, 121, 0.9)',
        borderRadius: '8px', 
        border: '0px solid #B8BBFF',
        color: '#cfd1fa',
        padding: "6px",
        

      }}>Welle: {currentWave}/3</div>
    </div>

    {/* Anzeige Welle starten */}
    {!waveActive && !dialogVisible && currentLevel < 4 && currentLevel < 5 && (
  <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
  style={{
    transform: 'translateY(90px)',

  }}>
  <button className="px-6 py-2 bg-[#1a4080] text-white font-semibold rounded-lg border border-[#ffffff] hover:bg-[#0f1e38] focus:outline-none focus:ring-2 focus:ring-[#2e7d32] focus:ring-opacity-50" onClick={startWave}>Welle starten</button>
    </div>
  )}

    {/* Anzeige Zeit */}
    {waveActive && (
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
        <div className=
        "text-xl"
        style={{
          backgroundColor:'rgba(121, 121, 121, 0.8)',
          borderRadius:"5px",
          color: "#dedfff",
          fontWeight:"normal",
          padding: "6px",
          marginTop:"-1px",
        }}>Zeit: {timer}s</div>
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

    {/* Aktuelle Leben-Anzeige */}
    <div className="absolute top-8 left-4">
      <div className="text-xl"
      style={{


        backgroundColor:'rgba(252, 101, 101, 0.7)',
        borderRadius:"7px",
        color: "#700000",
        fontWeight:"normal",
        padding: "3px",
        marginLeft: "296px",
        marginTop: "20px",
        border: '1px solid #000000',

      }}
      >Leben: {leben}</div>
    </div>

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


{/* Anzeige Welle starten
{!waveActive && !dialogVisible && currentLevel < 4 && currentLevel < 5 && (
<div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
  <button className="px-6 py-2 bg-[#4caf50] text-white font-semibold rounded-lg border border-[#388e3c] hover:bg-[#45a049] focus:outline-none focus:ring-2 focus:ring-[#2e7d32] focus:ring-opacity-50" onClick={startWave}>Welle starten</button>
</div>
)} */}



{!bonusFragenBeendet && (
<div className="absolute" style={{ top: 'calc(0rem + 100px)', right: '1rem' }}>
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
              <div className="text-center" onClick={() => handleBuildingClick(zone.id)}>
                <img src={zone.building.image} alt={zone.building.name} className="w-full h-full cursor-pointer" />
                <div className="text-sm font-bold text-black">Level: {zone.building.level}</div> {/* Level Anzeige */}
                {isBuildingClicked === zone.id && ( // Optionen werden nur in diesem Zustand angezeigt
                  <div className="mt-2">
                    <button className="bg-blue-500 text-white py-1 px-2 rounded" onClick={() => handleUpgrade(zone.id)}>Upgrade</button>
                    <button className="bg-red-500 text-white py-1 px-2 rounded" onClick={() => handleSell(zone.id)}>Verkaufen</button>
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


  

    

<div className="relative bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center items-center w-4/5">
<div className="flex space-x-4"> {/* horizontalen Reihe */}
  <BuildingList onSelectBuilding={handleDragStart} onShowInfo={handleShowInfo} />
</div>
</div>

    
    </div>
  )
}


export default Spiel;