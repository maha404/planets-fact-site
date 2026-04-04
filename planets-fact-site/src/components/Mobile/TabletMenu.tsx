import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function DesktopMenu() {
    const [data, setData] = useState([]);
    
      useEffect(() => {
        fetch('/data.json')
          .then((response) => response.json())
          .then((data) => setData(data))
          .catch((error) => console.error('Error fetching data:', error));
      }, []);

    return (
        <header className='desktop-header'>
            <h1>THE PLANETS</h1>
             <nav className="desktop-menu">
                <ul>
                {data && data.length > 0 ? (
                    data.map((planet: any) => (
                    <div className='' key={planet.name}>
                        <Link to={`/${planet.name}`} className="menu-item">
                        {planet.name}
                        </Link>
                    </div>
                    ))
                ) : (
                    <li className="menu-item">Loading...</li>
                )}
                </ul>
            </nav>
        </header>
    )
}