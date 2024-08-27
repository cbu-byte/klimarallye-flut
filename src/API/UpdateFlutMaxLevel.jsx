import React, { useState } from 'react';

function UpdateFlutMaxLevel({ userId }) {
  const [newFlutMaxLevel, setNewFlutMaxLevel] = useState('');

  const handleSave = () => {
    fetch('/api/flut', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId, 
        value: parseInt(newFlutMaxLevel)
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('FlutMaxLevel gespeichert:', data);
      })
      .catch(error => console.error('Error saving FlutMaxLevel:', error));
  };

  return (
    <div>
      <input
        type="number"
        value={newFlutMaxLevel}
        onChange={e => setNewFlutMaxLevel(e.target.value)}
        placeholder="Neuer FlutMaxLevel"
      />
      <button onClick={handleSave}>Speichern</button>
    </div>
  );
}

export default UpdateFlutMaxLevel;
