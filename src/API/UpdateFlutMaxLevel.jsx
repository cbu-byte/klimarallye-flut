import React from 'react';
import { jwtDecode } from 'jwt-decode';
import { getCookie } from '../lib/cookieUtils';

const UpdateFlutMaxLevel = ({ levelId }) => {
  React.useEffect(() => {
    // Funktion zum Aktualisieren des FlutMaxLevels auf dem Server
    const updateFlutMaxLevel = async () => {
      try {
        const jwtToken = getCookie('jwt'); // Holt das JWT-Token aus den Cookies

        if (jwtToken) {
          // Wenn das JWT-Token existiert, wird die UserId dekodiert
          const decodedToken = jwtDecode(jwtToken);
          const userId = decodedToken.sub; // Benutzer-ID aus dem Token

          // Post-Anfrage, um den neuen FlutMaxLevel an den Server zu senden
          await fetch('/api/flut', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId, // Benutzer-ID
              value: levelId, // Neuer maximaler Fortschritt (Level-ID)
            }),
          });
        }
      } catch (error) {
        console.error('Fehler beim Speichern des FlutMaxLevels:', error); // Fehlerbehandlung
      }
    };

    // Wenn ein gültiger LevelId vorhanden ist, wird der Fortschritt aktualisiert
    if (levelId) {
      updateFlutMaxLevel();
    }
  }, [levelId]); // Effekt läuft bei jedem Update von `levelId`

  return null; // Diese Komponente rendert ebenfalls nichts, sie agiert im Hintergrund
};

export default UpdateFlutMaxLevel;
