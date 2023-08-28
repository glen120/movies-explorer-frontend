import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

export default function MoviesCard({ name, duration, image }) {
  const location = useLocation();

  return (
    <li className='movie-card'>
      <img src={image} className='movie-card__image' alt={`Кадр из фильма ${name}`}/>
      <div className='movie-card__content'>
        <h3 className='movie-card__name'>{name}</h3>
        {(location.pathname === '/movies') &&
        <button
          className='movie-card__button movie-card__button_save'
          type='button'
          aria-label='Сохранить'
        />}
        {(location.pathname === '/saved-movies') &&
        <button
          className='movie-card__button movie-card__button_delete'
          type='button'
          aria-label='Удалить'
        />}
        <p className='movie-card__duration'>{duration}</p>
      </div>
    </li>
  );
}