import React from 'react';
import {jwtDecode} from 'jwt-decode';
import { getCookie } from '../lib/cookieUtils';

const UpdateFlutMaxLevel = ({ levelId }) => {
  React.useEffect(() => {
    const updateFlutMaxLevel = async () => {
      try {
        const jwtToken = getCookie('jwt');
        if (jwtToken) {
          const decodedToken = jwtDecode(jwtToken);
          const userId = decodedToken.sub;
          await fetch('/api/flut', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId,
              value: levelId,
            }),
          });
        }
      } catch (error) {
        console.error('Fehler beim Speichern des FlutMaxLevels:', error);
      }
    };

    if (levelId) {
      updateFlutMaxLevel();
    }
  }, [levelId]);

  return null; // Diese Komponente rendert nichts
};

export default UpdateFlutMaxLevel;
