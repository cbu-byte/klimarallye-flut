import React from 'react';
import './Navbar.css'; // Importiere die CSS-Datei
import coin from './images/Dollar Coin.png';
import profil from './images/Profil.png';

const Navbar = () => {
  return (
    <nav className="w-[430px] h-[88px] bg-[#9effb9]/30 border-b-2 border-[#e8edfb] flex items-center justify-between px-4 mx-auto">
      
      {/* Home Button am linken Rand */}
      <a href="/play/flut" className="text-[#b7baff] text-sm font-semibold">
        Home
      </a>
      
      {/* Geld */}
      <div className="money flex items-center justify-between w-[95px]">
        <div className="text-[#fcff8a] text-sm font-semibold font-['Inter'] leading-[17px]">500</div>
        <img className="w-7 h-5" src={coin} alt="icon" />
      </div>
      
      {/* Profile Image (kein Link) */}
      <img className="profile-img" src={profil} alt="Profil" />
      
      {/* Login Link */}
      <div>
        <a href="/login" className="text-[#b7baff] text-sm font-semibold">Login</a>
      </div>
    </nav>
  );
}

export default Navbar;
