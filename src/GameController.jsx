import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Spiel from './Spiel';
import FlutMaxLevel from './API/FlutMaxLevel';
import UpdateFlutMaxLevel from './API/UpdateFlutMaxLevel';

function GameController() {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [flutMaxLevel, setFlutMaxLevel] = useState(1); // Initialer Wert

  const handleSelectLevel = (level) => {
    setSelectedLevel(level);
  };

  const handleBackToDashboard = () => {
    setSelectedLevel(null); // Zurück zum Dashboard
  };

  const handleLevelComplete = (levelId) => {
    setFlutMaxLevel(Math.max(flutMaxLevel, levelId)); // Update lokal
  };


  return (
    <div className="min-h-screen">
      {selectedLevel ? (
        <Spiel
          level={selectedLevel}
          onBackToDashboard={handleBackToDashboard}
          onLevelComplete={handleLevelComplete}
        />
      ) : (
        <Dashboard
          onSelectLevel={handleSelectLevel}
          flutMaxLevel={flutMaxLevel} // FlutMaxLevel an Dashboard weitergeben
        />
      )}
    </div>
  );
}

/*
 useEffect(() => {
    // Versuche, den FlutMaxLevel vom Backend zu laden
    fetch('/api/flut')
      .then(response => response.json())
      .then(data => {
        if (data !== null && data !== undefined) {
          setFlutMaxLevel(data); // Setzt den FlutMaxLevel auf den Wert aus der API
        }
      })
      .catch(error => {
        console.error('Error fetching FlutMaxLevel:', error);
        // Wenn kein Cookie oder keine Daten vorhanden sind, bleibt der lokale Fortschritt bei 1
      });
  }, []);
*/

export default GameController;
