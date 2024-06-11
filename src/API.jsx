import React, { useEffect, useState } from 'react';

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
