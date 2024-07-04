import mapImage from './Titlescreen.png';
const Home = () => {
    function startGame() {
        // Hier kannst du die Logik für das Spiel ausführen
        console.log("Spiel gestartet!");
      
        // Weiterleitung zur "/Spiel"-Seite
        window.location.href = "/play/flut/Spiel";
      }
    return ( 
        
        <div className="hero min-h-screen" style={{
            backgroundImage: `url(${mapImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center', // Corrected typo: 'backgroundposition' to 'backgroundPosition'
        }}>
            <div className="Home text-center text-red-500" style={{ paddingBottom: '70%' }}>
                <div className='text-7xl'>
                <h1>Die Flut kommt</h1>
                </div>
                <div className="spielstarten text-black-500 text-xl">
                <label htmlFor="difficulty" className="text-black-500 text-xl" >Wähle die Schwierigkeitsstufe:</label>
                <p></p>
                <select id="difficulty">
                    <option value="easy">Einfach</option>
                    <option value="medium">Mittel</option>
                    <option value="hard">Schwer</option>
                </select>
                <button onClick={startGame}>Spiel starten</button>
                {/* Additional spacing */}
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            </div>
                {/* <img src={image} className='Startmenue' alt='start' /> */}
            
                </div>
        </div>
     );
}
 
export default Home ;