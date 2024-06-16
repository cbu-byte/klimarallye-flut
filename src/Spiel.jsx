// Spiel.jsx

import React, { useState } from 'react';
import mapImage from './Map.jpg';
import sandsackImage from './Sandsack.jpg'; // Importiere das Bild für den Sandsack

function Spiel() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sandsackShown, setSandsackShown] = useState(false); // Zustand für die Anzeige des Sandsack-Bildes

  const toggleMenu = () => {
    if (sandsackShown) {
      // Setze sandsackShown auf false, um das Sandsack-Bild zu verbergen, wenn der Menü-Button erneut geklickt wird
      setSandsackShown(false);
    } else {
      // Setze menuOpen auf true, um das Menü zu öffnen
      setMenuOpen(true);
    }
  };

  const handleMenuItemClick = (menuItem) => {
    // Hier kannst du verschiedene Aktionen basierend auf dem ausgewählten Menüpunkt durchführen
    switch (menuItem) {
      case 'Biberdamm':
        console.log('Biberdamm ausgewählt');
        // Füge hier die Logik für den Biberdamm hinzu
        break;
      case 'Staudamm':
        console.log('Staudamm ausgewählt');
        // Füge hier die Logik für den Staudamm hinzu
        break;
      case 'Sandsack':
        console.log('Sandsack ausgewählt');
        // Füge hier die Logik für den Sandsack hinzu
        setSandsackShown(true); // Zeige das Sandsack-Bild an
        break;
      default:
        break;
    }
    // Schließe das Menü nach Auswahl eines Menüpunkts
    setMenuOpen(false);
  };

  return (
    <div
      className="hero min-h-screen flex items-center justify-center"
      style={{
        position: 'relative',
        overflow: 'hidden', // Verhindert, dass das gedrehte Bild den Container überläuft
      }}
    >
      {/* Hier wird das Hintergrundbild separat gedreht */}
      <img
        src={mapImage}
        alt="Background"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(90deg)', // Hier wird das Hintergrundbild um 90 Grad gedreht und zentriert
          width: 'auto', // Automatische Breite, um das Bild im Container zu skalieren
          height: '100%', // Vollständige Höhe, um den Container zu füllen
          objectFit: 'cover' // Das Bild proportional skalieren und das Seitenverhältnis beibehalten
        }}
      />

      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          {/* Hier wird der Button als quadratischer Button mit der Klasse 'btn-square' gestaltet */}
          <button className="btn btn-square" onClick={toggleMenu}>
            {menuOpen && !sandsackShown ? 'Schließen' : 'Menü öffnen'}
          </button>
          {menuOpen && (
            <div className="menu">
              {/* Hier kannst du den Inhalt deines Menüs einfügen */}
              <ul>
                <li>
                  <button className="menu-btn biberdamm" onClick={() => handleMenuItemClick('Biberdamm')}>
                    Biberdamm
                  </button>
                </li>
                <li>
                  <button className="menu-btn staudamm" onClick={() => handleMenuItemClick('Staudamm')}>
                    Staudamm
                  </button>
                </li>
                <li>
                  <button className="menu-btn sandsack" onClick={() => handleMenuItemClick('Sandsack')}>
                    Sandsack
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Das Sandsack-Bild wird nur angezeigt, wenn sandsackShown true ist */}
      {sandsackShown && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <img src={sandsackImage} alt="Sandsack" style={{ width: '100px', height: '100px' }} /> {/* Hier kannst du die Breite und Höhe anpassen */}
        </div>
      )}
    </div>
  );
}

export default Spiel;
