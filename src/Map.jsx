import React, { useState, useEffect } from 'react';
import './Map.css'; // Stylesheet für die Anwendung

const Map = () => {
    const [measures, setMeasures] = useState([
      { name: 'Measure 1', level: 0 },
      { name: 'Measure 2', level: 0 }
    ]);
    const [waterLevel, setWaterLevel] = useState(0);
    const [wave, setWave] = useState(0);
  
    const upgradeMeasure = (index) => {
      if (measures[index].level < 3) {
        const updatedMeasures = [...measures];
        updatedMeasures[index].level++;
        setMeasures(updatedMeasures);
      }
    };
  
    const sellMeasure = (index) => {
      const updatedMeasures = [...measures];
      updatedMeasures[index].level = 0;
      setMeasures(updatedMeasures);
    };
  
    const startWave = () => {
      setWave(wave + 1);
      const interval = setInterval(() => {
        setWaterLevel(prevLevel => prevLevel + 1);
      }, 60000); // Erhöht den Wasserstand jede Minute
  
      setTimeout(() => clearInterval(interval), 60000); // Stoppt das Intervall nach einer Minute
    };
  
    return (
      <div className="app">
        <h1>Water Management System</h1>
        <div className="wave-button">
          <button onClick={startWave}>Start Wave {wave + 1}</button>
        </div>
        <div className="map">
          <div className="river"></div>
          <div className="slots">
            {measures.map((measure, index) => (
              <MeasureSlot
                key={index}
                name={measure.name}
                level={measure.level}
                onUpgrade={() => upgradeMeasure(index)}
                onSell={() => sellMeasure(index)}
              />
            ))}
          </div>
        </div>
        <p>Current Water Level: {waterLevel}</p>
      </div>
    );
  };
  
  export default Map;