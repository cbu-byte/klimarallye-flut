import Navbar from './Navbar';
import React from 'react';



function App() {

  return (
    <div className="App">
      <Navbar></Navbar>
      <div className="content">
        
        {/* <img src={image} className='Startmenue' alt='start' /> */}
        <h1>Die Flut kommt</h1>
      </div>
      
    <div className='spielstarten'>
    
    
    <label for="difficulty">Wähle die Schwierigkeitsstufe:</label>
    <select id="difficulty">
        <option value="easy">Einfach</option>
        <option value="medium">Mittel</option>
        <option value="hard">Schwer</option>
    </select>
    
    <button onclick="startGame()">Spiel starten</button>
    
    
    
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </div>
  )
}

export default App
