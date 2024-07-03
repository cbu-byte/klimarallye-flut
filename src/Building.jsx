import React from 'react';

// Definition des Building-Objekts
const buildings = [
  {
    id: 1,
    hp: 100,
    maxWaterLevel: 5,
    cost: 200,
    level: 1,
    name: 'Sandbag'
  },
  {
    id: 2,
    hp: 150,
    maxWaterLevel: 10,
    cost: 300,
    level: 1,
    name: 'Begradigung'
  },
  {
    id: 3,
    hp: 200,
    maxWaterLevel: 15,
    cost: 400,
    level: 1,
    name: 'Renaturierung'
  },
  {
    id: 4,
    hp: 250,
    maxWaterLevel: 20,
    cost: 500,
    level: 1,
    name: 'Deich'
  },
  {
    id: 5,
    hp: 300,
    maxWaterLevel: 25,
    cost: 600,
    level: 1,
    name: 'Deich lv2'
  },
  {
    id: 6,
    hp: 350,
    maxWaterLevel: 30,
    cost: 700,
    level: 1,
    name: 'Dam'
  },
  {
    id: 7,
    hp: 400,
    maxWaterLevel: 35,
    cost: 800,
    level: 1,
    name: 'Beaver Dam'
  }
];

// Komponente zur Darstellung der Buildings
const BuildingList = () => {
  return (
    <div>
      <h1>Buildings</h1>
      <ul>
        {buildings.map(building => (
          <li key={building.id}>
            <h2>{building.name}</h2>
            <p>HP: {building.hp}</p>
            <p>Max Water Level: {building.maxWaterLevel}</p>
            <p>Cost: {building.cost}</p>
            <p>Level: {building.level}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BuildingList;
