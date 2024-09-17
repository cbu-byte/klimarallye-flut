import mapImage from './images/Titlescreen.png';

const Home = () => {
  function startGame() {
    console.log("Spiel gestartet!");
    window.location.href = "/play/flut/Spiel";
    
    
  }

  return (
    <div className="hero min-h-screen relative" style={{
      backgroundImage: `url(${mapImage})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }}>
      {/* Container für den Titel */}
      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 p-2.5 bg-[#003a2c]/80 rounded-[13px] flex items-center justify-center w-[317px] h-[113px] text-center text-[#b7baff] text-[40px] font-semibold font-['Inter'] leading-[17px]">
        Die Flut kommt
      </div>

      {/* Container für die Schwierigkeitsauswahl */}
      <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
        <div className="bg-[#003a2c]/80 rounded-[13px] p-4 flex flex-col items-center justify-center w-[430px] h-[115px]">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-[#e1e2ff] text-sm font-semibold font-['Inter'] leading-[17px]">
              Wähle die Schwierigkeitsstufe:
            </div>
            <select
              id="difficulty"
              className="px-4 py-2 bg-[#333333] text-white border border-[#444444] rounded appearance-none focus:outline-none focus:ring-2 focus:ring-[#2e7d32] focus:ring-opacity-50"
            >
              <option value="easy">Einfach</option>
              <option value="medium">Mittel</option>
              <option value="hard">Schwer</option>
            </select>
          </div>
          <button
            onClick={startGame}
            className="px-6 py-2 bg-[#4caf50] text-white font-semibold rounded-lg border border-[#388e3c] hover:bg-[#45a049] focus:outline-none focus:ring-2 focus:ring-[#2e7d32] focus:ring-opacity-50"
          >
            Spiel starten
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
