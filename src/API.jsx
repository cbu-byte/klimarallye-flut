
import React, { useState } from 'react';

function API() {
  const [number, setNumber] = useState(null);
  const [inputValue, setInputValue] = useState('');

  // Nummer vom Backend abrufen
  const fetchNumber = async (id) => {
    const response = await fetch(`/api/numbers/${id}`);
    const data = await response.json();
    setNumber(data);
  };

  // Nummer im Backend speichern
  const saveNumber = async () => {
    const response = await fetch('/api/numbers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Number(inputValue))
    });
    const data = await response.json();
    setNumber(data.value);
  };

  return (
    <div>
      <h1>React & Spring Boot Demo</h1>
      <div>
        <button onClick={() => fetchNumber(1)}>Get Number</button>
        <p>Number: {number}</p>
      </div>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={saveNumber}>Save Number</button>
      </div>
    </div>
  );
}

export default API;
/**
 * import React, { useEffect, useState } from 'react';

const BuildingList = () => {
    const [buildings, setBuildings] = useState([]);

    useEffect(() => {
        fetch('/flut/buildings')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Netzwerkantwort war nicht ok');
                }
                return response.json();
            })
            .then(data => setBuildings(data))
            .catch(error => {
                console.error("Es gab einen Fehler beim Abrufen der Daten!", error);
            });
    }, []);

    return (
        <div>
            <h1>Gebäudeliste</h1>
            <ul>
                {buildings.map(building => (
                    <li key={building.id}>
                        <h2>{building.name}</h2>
                        <img src={`data:image/jpeg;base64,${building.image}`} alt={building.name} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BuildingList;
 */