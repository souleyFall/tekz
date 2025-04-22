import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="logo">
          TEKZ
        </Link>
        <nav>
          <ul className="nav-links">
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/dashboard">Tableau de bord</Link></li>
            <li><Link to="/about">À propos</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;