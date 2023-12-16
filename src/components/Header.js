import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <div className="nav-container">
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <Link className="nav-link" to="/">Etusivu</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Joululahjapaperit">Joululahjapaperit</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Koristenauhat">Koristenauhat</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Joulukortit">Joulukortit</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Ostoskori">Ostoskori</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Tekijat">Tekijät</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Yllapito">Ylläpito</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Register">Rekisteröidy</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Login">Login</Link>
          </li>


        </ul>
      </div>
    </header>
  );
}