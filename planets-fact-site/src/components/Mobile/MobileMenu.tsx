import { useState, useEffect } from 'react';
import hamburger from '../../assets/icon-hamburger.svg';
import chevron from '../../assets/icon-chevron.svg';
import { Link } from 'react-router-dom';

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
    <header className="mobile-header-container">
      <div className='mobile-header'>
        <h1>THE PLANETS</h1>
        <img
          src={hamburger}
          alt="Menu"
          className="hamburger-icon"
          onClick={toggleMenu}
        />
      </div>
      
      <nav className={`mobile-menu ${menuOpen ? 'open' : 'closed'}`}>
        <ul>
          {data && data.length > 0 ? (
            data.map((planet: any) => (
              <div className='menu-item-container menu-item-line' key={planet.name}>
                <Link to={`/${planet.name}`} className="menu-item">
                  <span className='circle' style={{backgroundColor: planet.color}}></span>
                  {planet.name}
                </Link>
                <img className="chevron" src={chevron} alt="" />
              </div>
            ))
          ) : (
            <li className="menu-item">Loading...</li>
          )}
        </ul>
      </nav>
    </header>
  );
}