import React from 'react';

function Dashboard({ onSelectLevel, flutMaxLevel }) {
  const levels = [
    { 
      id: 1, 
      name: 'Level 1', 
      map: 'MapImage1.jpg', 
      initialWaterLevel: 2, 
      maxWaterLevel: 17, 
      dialogs: [
        "Hallo, Ich bin Ihr wissenschaftlicher Berater heute beschäftigen wir uns mit dem Thema Hochwasser.",
        "Ich habe dir eine Simulation erstellt in welcher du dich an der 45 km langen Bega ausprobieren kannst.",
        "Deine erste Herausvorderung ist diese Stelle hier wurde die Bega begradigt.",
        "Durch eine begradigung wird die Fließgeschwindigkeit erhöht und der Fluss für die Schiffahrt nurzbar gemacht.",
        "Deine Aufgabe ist es den Wasserstand von der Quelle bei Blomberg bis zur Mündung in der Werre zu Kontrollieren.",
        "Wir wollen ja nicht das jemand Nasse Füße bekommt!"
      ],
      zones:[ 
        { id: 1, occupied: false, building: null, position: { left: '51%', top: '30%' } },
        { id: 2, occupied: false, building: null, position: { left: '50%', top: '40%' } },
        { id: 3, occupied: false, building: null, position: { left: '48%', top: '50%' } },
      ]
    },
    { 
      id: 2, 
      name: 'Level 2', 
      map: 'Map2.jpg', 
      initialWaterLevel: 1.5, 
      maxWaterLevel: 2.5, 
      dialogs: [
        "Sehr gut! Sie haben es geschafft doch ab jetzt ist nicht mehr nur der Starkregen dein Problem.",
        "Der Wasserstand steigt immer schneller, und jetzt musst du die Städte schützen erstmal Bad Salzuflen.",
        "Denken Sie daran, dass Ressourcen begrenzt sind. Planen Sie sorgfältig!"
      ],
      zones:[ 
        { id: 1, occupied: false, building: null, position: { left: '54%', top: '25%' } },
        { id: 2, occupied: false, building: null, position: { left: '49%', top: '30%' } },
        { id: 3, occupied: false, building: null, position: { left: '43%', top: '35%' } },
      ] 
    },
    { 
      id: 3, 
      name: 'Level 3', 
      map: 'Map3.jpg', 
      initialWaterLevel: 2, 
      maxWaterLevel: 4, 
      dialogs: [
        "Willkommen zur Letzten Herausvorderung! Die innenstadt Lemgo.",
        "Durch ein gewaltiges unwetter wurden leider Große teile von deinen bisherigen vorkerungen beschädigt.",
        "Jetzt musst du dich doppelt anstrengen!"
      ],
      zones:[ 
        { id: 1, occupied: false, building: null, position: { left: '54%', top: '47%' } },
        { id: 2, occupied: false, building: null, position: { left: '49%', top: '40%' } },
        { id: 3, occupied: false, building: null, position: { left: '43%', top: '35%' } },
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
