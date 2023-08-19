import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import './Header.css';

export default function Header({ isLogin }) {
  const header = (`header ${isLogin && 'header_movie'}`);
  return (
    <header className={header}>
      <Link to='/' className='header__logo-link'>
        { <img src={logo} className='header__logo' alt='Логотип приложения' /> }
      </Link>
      <Navigation isLogin={isLogin}/>
    </header>
  );
}