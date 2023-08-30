import React from 'react';
import { useLocation } from 'react-router-dom';
import { minutesInHour } from '../../../utils/utils'
import './MoviesCard.css';

export default function MoviesCard({ nameRu, duration, image }) {
  const location = useLocation();

  const durationInHours = duration >= minutesInHour ? `${Math.floor(duration / minutesInHour)} ч ` : '';
  const durationInMinutes = duration === minutesInHour ? '' : `${duration % minutesInHour} мин`;
  const movieDuration = durationInHours + durationInMinutes;

  return (
    <li className='movie-card'>
      <img src={image} className='movie-card__image' alt={`Кадр из фильма ${nameRu}`}/>
      <div className='movie-card__content'>
        <h3 className='movie-card__name'>{nameRu}</h3>
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
        <p className='movie-card__duration'>{movieDuration}</p>
      </div>
    </li>
  );
}