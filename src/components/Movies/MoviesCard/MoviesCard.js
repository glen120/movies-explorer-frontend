import React from 'react';
import { useLocation } from 'react-router-dom';
import { minutesInHour } from '../../../utils/utils'
import './MoviesCard.css';

export default function MoviesCard({ movie, isSaved, handleAddMovies, handleDeleteSavedMovies }) {
  const location = useLocation();

  const durationInHours = movie.duration >= minutesInHour ? `${Math.floor(movie.duration / minutesInHour)} ч ` : '';
  const durationInMinutes = movie.duration === minutesInHour ? '' : `${movie.duration % minutesInHour} мин`;
  const movieDuration = durationInHours + durationInMinutes;

  function addMovies() {
    handleAddMovies(movie);
  }

  function deleteMovies() {
    handleDeleteSavedMovies(movie);
  }

  return (
    <li className='movie-card'>
      {(location.pathname === '/movies') &&
      <img src={`https://api.nomoreparties.co/${movie.image.url}`} className='movie-card__image' alt={`Кадр из фильма ${movie.nameRU}`}/>
      }
      {(location.pathname === '/saved-movies') &&
      <img src={movie.image} className='movie-card__image' alt={`Кадр из фильма ${movie.nameRU}`}/>
      }
      <div className='movie-card__content'>
        <h3 className='movie-card__name'>{movie.nameRU}</h3>
        {(location.pathname === '/movies') &&
        <button
          className={`movie-card__button movie-card__button_${isSaved ? 'active' : 'save'}`}
          type='button'
          aria-label='Сохранить'
          onClick={isSaved ? deleteMovies : addMovies}
        />}
        {(location.pathname === '/saved-movies') &&
        <button
          className='movie-card__button movie-card__button_delete'
          type='button'
          aria-label='Удалить'
          onClick={deleteMovies}
        />}
        <p className='movie-card__duration'>{movieDuration}</p>
      </div>
    </li>
  );
}