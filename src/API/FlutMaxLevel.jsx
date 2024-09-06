import React, { useState, useEffect } from 'react';
import { getCookie } from '../lib/cookieUtils';
import { jwtDecode } from 'jwt-decode';

const FlutMaxLevel = ({ onFetchFlutMaxLevel }) => {
  useEffect(() => {
    // Funktion, um den FlutMaxLevel vom Backend zu laden
    const fetchFlutMaxLevel = async () => {
      try {
        const jwtToken = getCookie('jwt'); // Holt das JWT-Token aus den Cookies
        let url = '/api/flut'; // Basis-URL für den API-Endpunkt

        if (jwtToken) {
          // Wenn das JWT-Token existiert, wird der UserId dekodiert und an die URL angehängt
          const decodedToken = jwtDecode(jwtToken);
          const userId = decodedToken.sub; // Benutzer-ID aus dem Token
          url = `/api/flut/${userId}`; // URL, um den spezifischen Fortschritt des Users zu laden
        }

        // Fetch-Anfrage an den Server
        const response = await fetch(url);
        const data = await response.json();

        // Callback, um den geladenen FlutMaxLevel an die GameController-Komponente weiterzugeben
        onFetchFlutMaxLevel(data || 1); // Fallback auf 1, falls keine Daten existieren
      } catch (error) {
        console.error('Fehler beim Laden des FlutMaxLevels:', error);
        // Bei einem Fehler wird der lokale Fortschritt auf 1 gesetzt
        onFetchFlutMaxLevel(1);
      }
    };

    fetchFlutMaxLevel(); // Ruft die Funktion auf, sobald die Komponente geladen wird
  }, [onFetchFlutMaxLevel]);

  return null; // Diese Komponente rendert nichts, sie arbeitet nur im Hintergrund
};

export default FlutMaxLevel;
