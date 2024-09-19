import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import Spiel from './Spiel';
import LoadFlutMaxLevel from './API/FlutMaxLevel'; // Komponente, die den maximalen Fortschritt lädt
import UpdateFlutMaxLevel from './API/UpdateFlutMaxLevel'; // Komponente, die den Fortschritt speichert

function GameController() {
  const [selectedLevel, setSelectedLevel] = useState(null); // Speichert das aktuell ausgewählte Level
  const [flutMaxLevel, setFlutMaxLevel] = useState(1); // Speichert den maximalen Level-Fortschritt, initial 1

  // Funktion zum Auswählen eines Levels
  const handleSelectLevel = (level) => {
    setSelectedLevel(level);
  };

  // Funktion zum Zurücksetzen des ausgewählten Levels, um zum Dashboard zurückzukehren
  const handleBackToDashboard = () => {
    setSelectedLevel(null);
  };

  // Funktion, wenn ein Level abgeschlossen ist. Aktualisiert den Fortschritt auf dem höchsten Level
  const handleLevelComplete = (levelId) => {
    setFlutMaxLevel(Math.max(flutMaxLevel, levelId)); // Lokaler Fortschritt aktualisieren
  };

  // Wenn die Komponente gerendert wird, wird das API-Level über `FlutMaxLevel` geladen
  
  
    const loadFlutMaxLevel = (maxLevel) => {
      if (maxLevel > flutMaxLevel) {
        setFlutMaxLevel(maxLevel); // Setzt den maximalen Level-Fortschritt nur, wenn der neue Wert größer ist
      }
  

    
  }

  return (
    <div className="min-h-screen">
      {selectedLevel ? (
        // Wenn ein Level ausgewählt ist, wird die `Spiel`-Komponente geladen
        <Spiel
          level={selectedLevel}
          onBackToDashboard={handleBackToDashboard}
          onLevelComplete={handleLevelComplete}
        />
      ) : (
        // Andernfalls wird das Dashboard angezeigt
        <Dashboard
          onSelectLevel={handleSelectLevel}
          flutMaxLevel={flutMaxLevel} // Der aktuelle Fortschritt wird an das Dashboard übergeben
        />
      )}
        {/* Hier wird die `FlutMaxLevel`-Komponente verwendet, um den Fortschritt vom Backend zu laden */}
      <LoadFlutMaxLevel onFetchFlutMaxLevel={loadFlutMaxLevel} />
      {/* Diese Komponente wird verwendet, um den Fortschritt nach dem Abschluss eines Levels zu speichern */}
      <UpdateFlutMaxLevel levelId={flutMaxLevel} />
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
