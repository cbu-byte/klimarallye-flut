import React from 'react';
import './navbar.css'; // Importiere die CSS-Datei
import coin from './images/Dollar Coin.png';
import profil from './images/Profil.png';

const Navbar = () => {
  return (
    <nav className="w-[430px] h-[50px] bg-[#9effb9]/30 border-b-2 border-[#e8edfb] flex items-center justify-between px-4 mx-auto">
      
      {/* Home Button am linken Rand */}
      <a href="/play/flut" className="text-[#b7baff] text-sm font-semibold">
        Home
      </a>
      
      
      
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
