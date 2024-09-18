import Navbar from './Navbar';
import React from 'react';
import Home from './Home';
import Spiel from './Spiel';
import GameController from'./GameController';
import Bonusfragen from './Bonusfragen';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';

// function startGame() {
//   // Hier kannst du den Code für das Spiel ausführen
//   console.log("Spiel gestartet!");
  
//   <Spiel />

//   // Weitere Logik hier...
// }
function startGame() {
  // Hier kannst du die Logik für das Spiel ausführen
  console.log("Spiel gestartet!");

  // Weiterleitung zur "/Spiel"-Seite
  window.location.href = "/Spiel";
}
function App() {

  return (
    <>
      <div className="bg-[#003A2C] min-h-screen">
    <Router>
      <div className="App">
        <Navbar/>
        <div className="content">
        
          <Routes>
            <Route exact path="/play/flut/" element = {<Home/>}/>
            <Route path="/play/flut/Spiel" element = {<GameController/>}/>
            <Route path="/play/flut/fragen" element = {<Bonusfragen/>}/>
            <Route path="/play/flut/map" element = {<Map/>}/>
            <Route path="/play/flut/test" element = {<GameController/>}/>
          </Routes>
          
        </div>
      </div>
 
      </Router>
        </div>
        </>
  );
}

export default App
