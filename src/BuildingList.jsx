import React from 'react';
import infoIcon from './images/info-icon.jpg'; // Info-Icon Bild
import sandsackImg from './images/Sandsack.jpg';
import Biberdamm from './images/Biberdamm.png';
import './index.css';
// Definition des Building-Objekts
const buildings = [
  {
    id: 1,
    name: 'Sandbag',
    image: sandsackImg,
    hp: 100,
    maxWaterLevel: 3,  // Reduce to 3m for realism
    cost: 100,         // Cheaper due to low power
    level: 1,
    info: 'The sandbag provides basic flood protection. It can withstand up to 3 meters of water and serves as an initial defense line.',
    upgrades: [
      { level: 2, hp: 150, maxWaterLevel: 5, cost: 200, image: sandsackImg },
      { level: 3, hp: 200, maxWaterLevel: 7, cost: 300, image: sandsackImg }
    ]
  },
  {
    id: 2,
    name: 'Begradigung',
    image: sandsackImg,
    hp: 120, 
    maxWaterLevel: 8,  // Increased water level resistance
    cost: 250,         // Higher cost to reflect better protection
    level: 1,
    info: 'Begradigung helps smooth out the terrain, increasing flood resistance. It can hold up to 8 meters of water, offering better protection than sandbags.',
    upgrades: [
      { level: 2, hp: 180, maxWaterLevel: 12, cost: 350, image: sandsackImg },
      { level: 3, hp: 220, maxWaterLevel: 15, cost: 450, image: sandsackImg }
    ]
  },
  {
    id: 3,
    name: 'Renaturation',
    image: sandsackImg,
    hp: 150,  
    maxWaterLevel: 10, // Lower initial max water level, but scales well
    cost: 400,         // More expensive due to long-term benefit
    level: 1,
    info: 'Renaturation restores natural landscapes, enhancing water absorption. It offers flood protection up to 10 meters, making it a sustainable choice.',
    upgrades: [
      { level: 2, hp: 200, maxWaterLevel: 15, cost: 500, image: sandsackImg },
      { level: 3, hp: 250, maxWaterLevel: 20, cost: 600, image: sandsackImg }
    ]
  },
  {
    id: 4,
    name: 'Dam',
    image: sandsackImg,
    hp: 250, 
    maxWaterLevel: 20, // Strong initial protection
    cost: 600,         // Expensive but powerful
    level: 1,
    info: 'The dam offers robust protection against flooding, able to hold up to 20 meters of water. It is especially useful in flood-prone areas.',
    upgrades: [
      { level: 2, hp: 300, maxWaterLevel: 25, cost: 750, image: sandsackImg },
      { level: 3, hp: 350, maxWaterLevel: 30, cost: 900, image: sandsackImg }
    ]
  },
  {
    id: 5,
    name: 'Beaver Dam',
    image: Biberdamm,
    hp: 300,  
    maxWaterLevel: 30, // Slightly lower than before for balance
    cost: 900,         // Expensive due to strong effect
    level: 1,
    info: 'The beaver dam provides excellent natural water regulation, withstanding up to 30 meters of water. It mimics natural flood protection.',
    upgrades: [
      { level: 2, hp: 400, maxWaterLevel: 35, cost: 1000, image: Biberdamm },
      { level: 3, hp: 500, maxWaterLevel: 40, cost: 1200, image: Biberdamm }
    ]
  }
];

// Funktion zum Upgraden
const handleUpgradeBuilding = (zoneId) => {
  setZones(prevZones =>
    prevZones.map(zone => {
      if (zone.id === zoneId && zone.building.level < 3) {
        const nextUpgrade = zone.building.upgrades.find(u => u.level === zone.building.level + 1);
        return { ...zone, building: { ...zone.building, ...nextUpgrade } };
      }
      return zone;
    })
  );
};

// Komponente zur Darstellung der Buildings
const BuildingList = ({ onSelectBuilding, onShowInfo }) => {
  return (
    <div className="flex overflow-x-auto gap-4 p-4">
      {buildings.map(building => (
        <div key={building.id} className="relative w-16 h-16 sm:w-16 sm:h-16">
          <img
            src={building.image}
            alt={building.name}
            className="w-full h-full object-cover cursor-pointer"
            draggable
            onDragStart={() => onSelectBuilding(building)} // Drag Start
          />
          <button
            className="absolute top-2 right-2 bg-gray-800 text-white text-xs rounded-full w-8 h-8 flex items-center justify-center"
            onClick={() => onShowInfo(building)}
          >
            <img src={infoIcon} alt="Info" className="w-4 h-4" />
          </button>
        </div>
    ))}
  </div>
  

  );
};

export default BuildingList;
