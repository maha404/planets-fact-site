import { useState, useEffect } from 'react';
import hamburger from '../../assets/icon-hamburger.svg';

export default function MobileMenu() {
  const [data, setData] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="mobile-header">
      <h1>THE PLANETS</h1>
      <img
        src={hamburger}
        alt="Menu"
        className="hamburger-icon"
        onClick={toggleMenu}
      />
      <nav className={`mobile-menu ${menuOpen ? 'open' : 'closed'}`}>
        <ul>
          {data.map((planet: any) => (
            <li key={planet.name} className="menu-item">
              {planet.name}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}