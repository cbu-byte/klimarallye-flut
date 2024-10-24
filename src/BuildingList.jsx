import React from 'react';
import infoIcon from './images/info-icon.jpg'; // Info-Icon Bild
import begradigung1 from './images/begradigung1.jpg';
import Biberdamm from './images/Biberdamm.png';
import dam2 from './images/dam2.jpg';
import dam3 from './images/dam3.jpg';
import sandsackImg from './images/Sandsack.jpg';
import sandsack2 from './images/sandsack2.jpg';
import sandsack3 from './images/sandsack3.jpg';
//renatureierung
import natur1 from './images/natur1.jpeg';
import natur2 from './images/natur2.jpeg';
import natur3 from './images/natur3.jpeg';
import './index.css';
//deich
import deich1 from './images/deich1.jpg';
import deich2 from './images/deich2.jpg';
import deich3 from './images/deich3.jpg';
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
    info: 'Der Sandsack ist eine grundlegende Flutschutzmaßnahme. Er bietet eine solide erste Verteidigung gegen Überschwemmungen.',
    upgrades: [
      { level: 2, hp: 150, maxWaterLevel: 5, cost: 200, image: sandsack2},
      { level: 3, hp: 200, maxWaterLevel: 7, cost: 300, image: sandsack3 }
    ]
  },
  {
    id: 2,
    name: 'Begradigung',
    image: begradigung1,
    hp: 120,
    maxWaterLevel: -10,
    cost: 250,
    level: 1,
    info: 'Die Begradigung ist eine Maßnahme zur Verbesserung der Flutschutzwirkung durch die Schaffung eines ebenen Untergrunds.',
    upgrades: [
      { level: 2, hp: 180, maxWaterLevel: -15, cost: 350, image: begradigung1 },
      { level: 3, hp: 220, maxWaterLevel: -20, cost: 450, image: begradigung1 }
    ]
  },
  {
    id: 3,
    name: 'Renaturation',
    image: natur1,
    hp: 150,
    maxWaterLevel: 10,
    cost: 400,
    level: 1,
    info: 'Die Renaturierung verbessert die Fähigkeit zur Wasseraufnahme durch Wiederherstellung natürlicher Landschaften.',
    upgrades: [
      { level: 2, hp: 200, maxWaterLevel: 20, cost: 500, image: natur2 },
      { level: 3, hp: 250, maxWaterLevel: 25, cost: 600, image: natur3 }
    ]
  },
  {
    id: 4,
    name: 'Deich',
    image: deich1,
    hp: 250,
    maxWaterLevel: 20,
    cost: 600,
    level: 1,
    info: 'Der Deich bietet einen sehr guten Schutz vor Hochwasser, besonders in Gebieten, in denen es regelmäßig zu Hochwassern kommt.',
    upgrades: [
      { level: 2, hp: 300, maxWaterLevel: 25, cost: 750, image: deich2 },
      { level: 3, hp: 350, maxWaterLevel: 30, cost: 900, image: deich3 }
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
    info: 'Der Biberdamm bietet einfachen Schutz vor Hochwasser. Er simuliert die natürliche Wasserregulation durch Dämme und bietet umfassenden Schutz.',
    upgrades: [
      { level: 2, hp: 400, maxWaterLevel: 35, cost: 1000, image: dam2 },
      { level: 3, hp: 500, maxWaterLevel: 40, cost: 1200, image: dam3 }
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
            onDragStart={() => onSelectBuilding(building)}
            onTouchStart={() => onSelectBuilding(building)}
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
