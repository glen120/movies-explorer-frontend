import React from 'react';
import './NavTab.css';

export default function NavTab() {
  return (
    <nav className='navtab'>
      <ul className='navtab__list'>
        <li>
          <a href='#about-project' className='navtab__link'>О проекте</a>
        </li>
        <li>
          <a href='#techs' className='navtab__link'>Технологии</a>
        </li>
        <li>
          <a href='#about-me' className='navtab__link'>Студент</a>
        </li>
      </ul>
    </nav>
  );
}