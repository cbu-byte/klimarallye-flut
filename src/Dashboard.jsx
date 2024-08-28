import React from 'react';

function Dashboard({ onSelectLevel, flutMaxLevel }) {
  const levels = [
    { id: 1, name: 'Level 1', map: 'MapImage1.jpg', initialWaterLevel: 1, maxWaterLevel: 2.5 },
    { id: 2, name: 'Level 2', map: 'Map2.jpg', initialWaterLevel: 1.5, maxWaterLevel: 2.5 },
    { id: 3, name: 'Level 3', map: 'Map3.jpg', initialWaterLevel: 2, maxWaterLevel: 4 },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-top">
      <h1 className="text-3xl mb-4">Wähle ein Level</h1>
      <ul className="space-y-4">
        {levels.map(level => (
          <li key={level.id}>
            <button
              className="btn btn-primary"
              onClick={() => onSelectLevel(level)}
              disabled={level.id > flutMaxLevel} // Sperrt Levels über dem FlutMaxLevel 
            >
              {level.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
