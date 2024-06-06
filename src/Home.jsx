const Home = () => {
    function startGame() {
        // Hier kannst du die Logik für das Spiel ausführen
        console.log("Spiel gestartet!");
      
        // Weiterleitung zur "/Spiel"-Seite
        window.location.href = "/Spiel";
      }
    return ( 
        
        <><div className="Home">

            {/* <img src={image} className='Startmenue' alt='start' /> */}
            <h1>Die Flut kommt</h1>
            
        </div><div className='spielstarten'>

 
                <label htmlFor="difficulty">Wähle die Schwierigkeitsstufe:</label>
                <select id="difficulty">
                    <option value="easy">Einfach</option>
                    <option value="medium">Mittel</option>
                    <option value="hard">Schwer</option>
                </select>

                <button onClick={startGame}>Spiel starten</button>
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
            </div></>
     );
}
 
export default Home ;