import React from 'react';
import './MoviesCard.css';

export default function MoviesCard({ image, name, duration }) {
  return (
    <li className='movie-card'>
      <img src={image} className='movie-card__image' alt={`Кадр из фильма ${name}`}/>
      <div className='movie-card__content'>
        <h3 className='movie-card__name'>{name}</h3>
        <button
          className='movie-card__button'
          type='button'
          aria-label='Сохранить'
        />
        <p className='movie-card__duration'>{duration}</p>
      </div>
    </li>
  );
}