import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

export default function Navigation({ isLogin }) {
  return (
    <nav className='navigation'>
      {!isLogin &&
      <div className='navigation-main'>
        <NavLink to='/signup'
                 className='navigation-main__link'>
          <p className='navigation-main__reg'>Регистрация</p>
        </NavLink>
        <NavLink to='/signin'
                 className='navigation-main__link'>
          <button className='navigation-main__login' type='button'>Войти</button>
        </NavLink>
      </div>}

      {isLogin &&
      <div className='navigation-login'>
        <NavLink to='/movies'
                 className={({ isActive }) => `navigation-login__title ${isActive && 'navigation-login__title_active'}`}>Фильмы</NavLink>
        <NavLink to='/saved-movies'
                 className={({ isActive }) => `navigation-login__title ${isActive && 'navigation-login__title_active'}`}>Сохранённые фильмы</NavLink>
        <NavLink to='/profile'
                 className='navigation-profile'>
          <p className='navigation-profile__link'>Аккаунт</p>
        </NavLink>
      </div>}
    </nav>
  );
}

