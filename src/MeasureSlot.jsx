import React, { useState, useEffect } from 'react';
import './App.css'; // Stylesheet für die Anwendung

// Maßnahmen-Komponente
const MeasureSlot = ({ name, level, onUpgrade, onSell }) => {
  return (
    <div className="measure-slot">
      <p>{name} (Level {level})</p>
      <button onClick={onUpgrade} disabled={level >= 3}>
        Upgrade
      </button>
      <button onClick={onSell}>
        Sell
      </button>
    </div>
  );
};

export default MeasureSlot;