import React from 'react';
import './AboutMe.css';
import photo from '../../../images/me.JPG';

export default function AboutMe() {
  return (
    <section className='about-me' id='about-me'>
      <h2 className='about-me__title'>Студент</h2>
      <article className='about-me__profile'>
        <div className='about-me__description'>
          <h3 className='about-me__name'>Сергей</h3>
          <p className='about-me__job'>Фронтенд-разработчик, 39 лет</p>
          <p className='about-me__text'>
            Живу в Туле, работаю в бюджетной организации. В связи с политической и финансовой нестабильностью в стране,
            а также для борьбы с возможным в старости Альцгеймером, решил "ворваться в ай-ти". Выбор пал
            на веб-разработку, как на наиболее доступную точку входа в программирование.
          </p>
          <a className='about-me__link' href='https://github.com/glen120' target='blank'>Github</a>
        </div>
        <img src={photo} className='about-me__photo' alt='Сергей Корнилов' />
      </article>
    </section>
  );
}