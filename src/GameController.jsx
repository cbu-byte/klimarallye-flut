import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import Spiel from './Spiel';
import { jwtDecode } from 'jwt-decode';
import { getCookie } from './lib/cookieUtils';

function GameController() {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [flutMaxLevel, setFlutMaxLevel] = useState(1); // Initialer Wert

  useEffect(() => {
    const fetchFlutMaxLevel = async () => {
      try {
        const jwtToken = getCookie('jwt');
        let url = '/api/flut';
        if (jwtToken) {
          const decodedToken = jwtDecode(jwtToken);
          const userId = decodedToken.sub;
          url = `/api/flut/${userId}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        setFlutMaxLevel(data || 1); // Setzt FlutMaxLevel, falls vorhanden
      } catch (error) {
        console.error('Fehler beim Laden des FlutMaxLevels:', error);
      }
    };

    fetchFlutMaxLevel();
  }, []);

  const handleSelectLevel = (level) => {
    setSelectedLevel(level);
  };

  const handleBackToDashboard = () => {
    setSelectedLevel(null); // Zurück zum Dashboard
  };

  const handleLevelComplete = (levelId) => {
    if (getCookie('jwt')) { // Überprüfen, ob der Benutzer angemeldet ist
      // Update FlutMaxLevel im Backend
      fetch('/api/flut', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: jwtDecode(getCookie('jwt')).sub,
          value: levelId
        }),
      })
        .then(response => response.json())
        .then(data => console.log('FlutMaxLevel aktualisiert:', data))
        .catch(error => console.error('Fehler beim Speichern des FlutMaxLevels:', error));
    }
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
