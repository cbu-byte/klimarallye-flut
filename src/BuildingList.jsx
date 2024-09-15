import React from 'react';
import infoIcon from './images/info-icon.jpg'; // Info-Icon Bild
import sandsackImg from './images/Sandsack.jpg';
// Definition des Building-Objekts
const buildings = [
  {
    id: 1,
    name: 'Sandbag',
    image: sandsackImg,
    hp: 100,
    maxWaterLevel: 5,
    cost: 200,
    level: 1,
    info: 'Der Sandsack ist eine grundlegende Flutschutzmaßnahme. Er kann bis zu 5 Meter Wasserstand halten und bietet eine solide erste Verteidigung gegen Überschwemmungen.',
    upgrades: [
      { level: 2, hp: 150, maxWaterLevel: 7, cost: 300, image: sandsackImg },
      { level: 3, hp: 200, maxWaterLevel: 10, cost: 400, image: sandsackImg }
    ]
  },
  {
    id: 2,
    name: 'Begradigung',
    image: sandsackImg,
    hp: 150,
    maxWaterLevel: -10,
    cost: 300,
    level: 1,
    info: 'Die Begradigung ist eine Maßnahme zur Verbesserung der Flutschutzwirkung durch die Schaffung eines ebenen Untergrunds. Sie kann bis zu 10 Meter Wasserstand halten und bietet besseren Schutz als einfache Sandsäcke.',
    upgrades: [
      { level: 2, hp: 200, maxWaterLevel: 15, cost: 400, image: sandsackImg },
      { level: 3, hp: 250, maxWaterLevel: 20, cost: 500, image: sandsackImg }
    ]
  },
  {
    id: 3,
    name: 'Renaturation',
    image: sandsackImg,
    hp: 200,
    maxWaterLevel: 15,
    cost: 400,
    level: 1,
    info: 'Die Renaturierung verbessert die Fähigkeit zur Wasseraufnahme durch Wiederherstellung natürlicher Landschaften. Sie bietet Schutz bis zu 15 Meter Wasserstand und trägt zur langfristigen Stabilität bei.',
    upgrades: [
      { level: 2, hp: 250, maxWaterLevel: 20, cost: 500, image: sandsackImg },
      { level: 3, hp: 300, maxWaterLevel: 25, cost: 600, image: sandsackImg }
    ]
  },
  {
    id: 4,
    name: 'Dam',
    image: sandsackImg,
    hp: 250,
    maxWaterLevel: 20,
    cost: 500,
    level: 1,
    info: 'Ein Deich bietet robusten Schutz gegen Überschwemmungen und kann bis zu 20 Meter Wasserstand halten. Er ist besonders nützlich in Gebieten mit regelmäßigem Hochwasser.',
    upgrades: [
      { level: 2, hp: 300, maxWaterLevel: 25, cost: 600, image: sandsackImg },
      { level: 3, hp: 350, maxWaterLevel: 30, cost: 700, image: sandsackImg }
    ]
  },
  {
    id: 7,
    name: 'Beaver Dam',
    image: sandsackImg,
    hp: 400,
    maxWaterLevel: 35,
    cost: 800,
    level: 1,
    info: 'Der Biberdamm bietet exzellenten Schutz und kann bis zu 35 Meter Wasserstand halten. Er simuliert die natürliche Wasserregulation durch Dämme und bietet umfassenden Schutz.',
    upgrades: [
      { level: 2, hp: 500, maxWaterLevel: 40, cost: 900, image: sandsackImg },
      { level: 3, hp: 600, maxWaterLevel: 45, cost: 1000, image: sandsackImg }
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
    <div className="flex justify-between w-full">
      {buildings.map(building => (
        <div key={building.id} className="relative w-24 h-24 m-2">
          <img
            src={building.image}
            alt={building.name}
            className="w-full h-full object-cover cursor-pointer"
            draggable
            onDragStart={() => onSelectBuilding(building)} // Drag Start
          />
          <button
            className="absolute top-1 right-1 bg-gray-800 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center"
            onClick={() => onShowInfo(building)}
          >
            <img src={infoIcon} alt="Info" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default BuildingList;
