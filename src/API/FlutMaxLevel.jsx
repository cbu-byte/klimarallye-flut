import React, { useState, useEffect } from 'react';

function FlutMaxLevel({ userId }) {
  const [flutMaxLevel, setFlutMaxLevel] = useState(null);

  useEffect(() => {
    fetch(`/api/flut/${userId}`)
      .then(response => response.json())
      .then(data => setFlutMaxLevel(data))
      .catch(error => console.error('Error fetching FlutMaxLevel:', error));
  }, [userId]);

  return (
    <div>
      <p>Aktueller FlutMaxLevel: {flutMaxLevel !== null ? flutMaxLevel : 'Kein Wert vorhanden'}</p>
    </div>
  );
}

export default FlutMaxLevel;
