import React from 'react';

function Dashboard({ onSelectLevel, flutMaxLevel }) {
  const levels = [
    { 
      id: 1, 
      name: 'Level 1', 
      map: 'MapImage1.jpg', 
      initialWaterLevel: 2.4, 
      maxWaterLevel: 2.5, 
      dialogs: [
        "Willkommen zum Spiel! Ich bin Ihr wissenschaftlicher Berater.",
        "Ihre Aufgabe ist es, die Fluten zu kontrollieren und die Stadt zu schützen.",
        "Nutzen Sie verschiedene Maßnahmen, um den Wasserstand zu regulieren.",
        "Viel Erfolg!"
      ] 
    },
    { 
      id: 2, 
      name: 'Level 2', 
      map: 'Map2.jpg', 
      initialWaterLevel: 1.5, 
      maxWaterLevel: 2.5, 
      dialogs: [
        "Willkommen zu Level 2! Die Herausforderungen nehmen zu.",
        "Staudämme sind jetzt verfügbar. Setzen Sie sie strategisch ein, um die Flut aufzuhalten.",
        "Denken Sie daran, dass Ressourcen begrenzt sind. Planen Sie sorgfältig!"
      ] 
    },
    { 
      id: 3, 
      name: 'Level 3', 
      map: 'Map3.jpg', 
      initialWaterLevel: 2, 
      maxWaterLevel: 4, 
      dialogs: [
        "Willkommen zu Level 3! Dies ist das schwierigste Level.",
        "Der Wasserstand steigt schneller, und mehr Maßnahmen sind erforderlich.",
        "Nutzen Sie alle verfügbaren Mittel, um die Stadt zu schützen. Viel Erfolg!"
      ] 
    },
  ];

  const getButtonStyle = (levelId) => {
    switch(levelId) {
      case 1:
        return { backgroundColor: '#4CAF50' }; // Grüner Button
      case 2:
        return { backgroundColor: '#FFC107' }; // Gelber Button
      case 3:
        return { backgroundColor: '#F44336' }; // Roter Button
      default:
        return {};
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-top">
      <div className="p-6"></div>
      <div className="level-heading text-3xl mb-4">Wähle ein Level</div>
      <ul className="space-y-4">
        {levels.map(level => (
          <li key={level.id}>
            <button
              style={getButtonStyle(level.id)}
              className="level-button"
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
