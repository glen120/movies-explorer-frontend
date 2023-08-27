import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className='footer'>
      <h3 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      <nav className='footer__navigation'>
        <p className='footer__copyright'>&copy; 2023</p>
        <ul className='footer__links'>
          <li className='footer__links-item'>
            <a href='https://practicum.yandex.ru' className='footer__link' target='blank'>Яндекс.Практикум</a>
          </li>
          <li className='footer__links-item'>
            <a href='https://github.com/glen120' className='footer__link' target='blank'>Github</a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}