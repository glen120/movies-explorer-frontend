import React from 'react';
import './Portfolio.css';

export default function Portfolio() {
  return (
    <section className='portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <ul className='portfolio__list'>
        <li className='portfolio__list-item'>
          <a href='https://github.com/glen120/how-to-learn' className='portfolio__link' target='blank'>
            Статичный сайт
          </a>
        </li>
        <li className='portfolio__list-item'>
          <a href='https://github.com/glen120/russian-travel' className='portfolio__link' target='blank'>
            Адаптивный сайт
          </a>
        </li>
        <li className='portfolio__list-item'>
          <a href='https://github.com/glen120/react-mesto-api-full-gha' className='portfolio__link' target='blank'>
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </section>
  );
}