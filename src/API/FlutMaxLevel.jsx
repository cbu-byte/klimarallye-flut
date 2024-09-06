import React, { useState, useEffect } from 'react';
import { getCookie } from '../lib/cookieUtils';
import {jwtDecode} from 'jwt-decode';

const FlutMaxLevel = ({ onFetchFlutMaxLevel }) => {
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
        onFetchFlutMaxLevel(data || 1); // Rückgabe des Levels
      } catch (error) {
        console.error('Fehler beim Laden des FlutMaxLevels:', error);
        onFetchFlutMaxLevel(1); // Default-Wert bei Fehler
      }
    };

    fetchFlutMaxLevel();
  }, [onFetchFlutMaxLevel]);

  return null; // Diese Komponente rendert nichts
};

export default FlutMaxLevel;
