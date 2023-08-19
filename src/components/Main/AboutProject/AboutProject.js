import React from 'react';
import './AboutProject.css';

export default function AboutProject() {
  return (
    <section className='about-project' id='about-project'>
      <h2 className='about-project__title'>О проекте</h2>
      <article className='about-project__description'>
        <div className='about-project__paragraph'>
          <h3 className='about-project__subtitle'>Дипломный проект включал 5 этапов</h3>
          <p className='about-project__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className='about-project__paragraph'>
          <h3 className='about-project__subtitle'>На выполнение диплома ушло 5 недель</h3>
          <p className='about-project__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </article>
      <div className='about-project__time'>
        <p className='about-project__time-block'>1 неделя</p>
        <p className='about-project__time-text'>Back-end</p>
        <p className='about-project__time-block'>4 недели</p>
        <p className='about-project__time-text'>Front-end</p>
      </div>
    </section>
  );
}