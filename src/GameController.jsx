import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Spiel from './Spiel';

function GameController() {
  const [selectedLevel, setSelectedLevel] = useState(null);

  const handleSelectLevel = (level) => {
    setSelectedLevel(level);
  };



  const handleBackToDashboard = () => {
    setSelectedLevel(null); // Zurück zum Dashboard
  };

  return (
    <div className="min-h-screen">
      {selectedLevel ? (
        <Spiel
          level={selectedLevel}
          onBackToDashboard={handleBackToDashboard}
        />
      ) : (
        <Dashboard onSelectLevel={handleSelectLevel} />
      )}
    </div>
  );
}

export default GameController;
