import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import icon from "../../../images/profile__icon.svg";

export default function Navigation({ isLogin, isMain }) {
  const navigation = (`navigation ${isLogin ? 'navigation_movies' : ''}`);
  const loginIcon = (`navigation-login__icon ${isMain ? 'navigation-login__icon-main' : ''}`);
  const profile = (`navigation-login__profile ${isMain ? 'navigation-login__profile-main' : ''}`);

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  function openSidebar() {
    setIsSidebarOpen(true);
  }
  function closeSidebar() {
    setIsSidebarOpen(false);
  }

  return (
    <nav className={navigation}>
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
      </div>
      }

      {isLogin &&
      <div className='navigation-login'>
        <NavLink to='/movies'
                 className={({ isActive }) => `navigation-login__title ${isActive ? 'navigation-login__title_active' : ''}`}>Фильмы</NavLink>
        <NavLink to='/saved-movies'
                 className={({ isActive }) => `navigation-login__title ${isActive ? 'navigation-login__title_active' : ''}`}>Сохранённые фильмы</NavLink>
        <NavLink to='/profile'
                 className={profile}>
          <p className='navigation-login__profile-link'>Аккаунт</p>
          <img src={icon} className={loginIcon} alt='Иконка аккаунта' />
        </NavLink>
      </div>
      }

      {isLogin &&
      <button className='navigation-burger'
              type='button'
              aria-label='Меню'
              onClick={openSidebar}>
      </button>
      }

      {isLogin &&
      <div className={`navigation-sidebar ${isSidebarOpen ? 'navigation-sidebar_opened' : ''}`} >
        <div className='navigation-sidebar__content'>
          <button className='navigation-sidebar__button'
                  type='button'
                  aria-label='Закрыть'
                  onClick={closeSidebar}>
          </button>
          <ul className='navigation-sidebar__list'>
            <li className='navigation-sidebar__list-item'>
              <NavLink to='/'
                       className={({ isActive }) => `navigation-sidebar__link ${isActive ? 'navigation-sidebar__link_active' : ''}`}>Главная</NavLink>
            </li>
            <li className='navigation-sidebar__list-item'>
              <NavLink to='/movies'
                       className={({ isActive }) => `navigation-sidebar__link ${isActive ? 'navigation-sidebar__link_active' : ''}`}>Фильмы</NavLink>
            </li>
            <li className='navigation-sidebar__list-item'>
              <NavLink to='/saved-movies'
                       className={({ isActive }) => `navigation-sidebar__link ${isActive ? 'navigation-sidebar__link_active' : ''}`}>Сохранённые фильмы</NavLink>
            </li>
          </ul>
          <NavLink to='/profile'
                   className='navigation-sidebar__profile'>
            <p className='navigation-login__profile-link'>Аккаунт</p>
            <img src={icon} className='navigation-login__icon' alt='Иконка аккаунта' />
          </NavLink>
        </div>
      </div>
      }
    </nav>
  );
}

