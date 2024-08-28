import React, { useEffect, useState} from 'react';
import { jwtDecode } from "jwt-decode";
import { getCookie } from "./lib/cookieUtils";

function Dashboard({ onSelectLevel }) {
  //const [userId, setUserId] = useState(null); // for User Identification
  const levels = [
    { id: 1, name: 'Level 1', map: 'MapImage1.jpg', initialWaterLevel: 1, maxWaterLevel: 1.2 },
    { id: 2, name: 'Level 2', map: 'Map2.jpg', initialWaterLevel: 1.5, maxWaterLevel: 2.5 },
    { id: 3, name: 'Level 3', map: 'Map3.jpg', initialWaterLevel: 2, maxWaterLevel: 4 },
  ];
  
/*
  useEffect(() => {
    const jwtToken = getCookie("jwt");
  
    if (jwtToken) {
      console.log("JWT Token gefunden:", jwtToken); // Debug-Ausgabe
      try {
        const decodedToken = jwtDecode(jwtToken);
        console.log("Decoded Token:", decodedToken); // Debug-Ausgabe
        const userIdFromToken = decodedToken.sub;
        setUserId(userIdFromToken);
      } catch (error) {
        console.error('Fehler beim Decodieren des JWT-Tokens:', error);
      }
    }
  }, []);
  */
  useEffect(() => {
    const jwtToken = getCookie("jwt");

    if (jwtToken) {
      setToken(jwtToken);
      
      try {
        // Decodieren des Tokens, um die Payload zu extrahieren
        const decodedToken = jwtDecode(jwtToken);
        // Extrahiere die user_id aus der Payload
        const userIdFromToken = decodedToken.sub; // Verwende hier "sub", da du die user_id unter "sub" gesetzt hast

        // Setze die user_id in den State
        //setUserId(userIdFromToken);
      } catch (error) {
        console.error('Fehler beim Decodieren des JWT-Tokens:', error);
      }
        
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-top">
      <h1 className="text-3xl mb-4">Wähle ein Level</h1>
      <ul className="space-y-4">
        {/* Liste der Level */}
        {levels.map(level => (
          <li key={level.id}>
            <button
              className="btn btn-primary"
              onClick={() => onSelectLevel(level)} // Klick-Event für die Levelauswahl
            >
              {level.name} {/* Name des Levels */}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;

