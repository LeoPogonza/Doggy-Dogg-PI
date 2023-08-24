import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar';
import './Header.css';
import menu from '../../images/menu.svg';

function Header() {
  const [menuHo, setMenuHo] = useState(false);

  function handleClick() {
    setMenuHo(!menuHo);
  }

  return (
    <div className="header">
      <div className="header_cont">
        <div className="div_responsive_header">
          <Link to="/home" className="logo">
            <h1 className="logo">DOGGY DOGG</h1>
          </Link>
          <button className="button_header_menu" onClick={handleClick}>
            <img className="menu" src={menu} alt="menu" />
          </button>
        </div>

        <div className={menuHo ? 'menu_hiden active' : 'menu_hiden'}>
          <a
            href="https://github.com/JuanLeonelPogonza/PI-Dogs-main"
            target="_balck"
            className="about_responsive"
          >
            GitHub
          </a>
        </div>

        <div className="nav">
          <a
            href="https://github.com/JuanLeonelPogonza/PI-Dogs-main"
            target="_balck"
            className="about"
          >
            GitHub
          </a>
          <SearchBar />
        </div>
      </div>
    </div>
  );
}

export default Header;
