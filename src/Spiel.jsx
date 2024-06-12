
import mapImage from './Map.jpg';

function Spiel() {
  return (
    <div
      className="hero min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${mapImage})`,
        backgroundSize: `cover`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <button className="btn btn-outline">Default</button>
        </div>
      </div>
    </div>
  );
}

export default Spiel;