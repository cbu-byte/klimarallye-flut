
import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Spiel from './Spiel';

function Mock() {
  const [selectedLevel, setSelectedLevel] = useState(null);

  const handleSelectLevel = (level) => {
    setSelectedLevel(level);
  };

  return (
    <div className="min-h-screen">
      {selectedLevel ? (
        <Spiel level={selectedLevel} />
      ) : (
        <Dashboard onSelectLevel={handleSelectLevel} />
      )}
    </div>
  );
}

export default Mock;
