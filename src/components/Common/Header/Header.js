import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import './Header.css';

export default function Header({ isLogin, isMain }) {
  const header = (`header ${isMain ? 'header_main' : 'header_movies'}`);
  return (
    <header className={header}>
      <Link to='/' className='header__logo-link'>
        <img src={logo} className='header__logo' alt='Логотип приложения' />
      </Link>
      <Navigation
        isLogin={isLogin}
        isMain={isMain}
      />
    </header>
  );
}