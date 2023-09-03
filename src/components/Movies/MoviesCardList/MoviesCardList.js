import React, { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoreButton from '../MoreButton/MoreButton';
import { displaySettings } from '../../../utils/utils';
import './MoviesCardList.css';

export default function MoviesCardList({ movies, displaySetting }) {
  const [isDisplayMovies, setIsDisplayMovies] = useState(0);
  const [isAddMovies, setIsAddMovies] = useState(0);

  function displayMovies(windowWidth) {
    if (windowWidth > 768) {
      setIsDisplayMovies(displaySettings.main.movies);
      setIsAddMovies(displaySettings.main.add);
    }
    else if (windowWidth > 425) {
      setIsDisplayMovies(displaySettings.pad.movies);
      setIsAddMovies(displaySettings.pad.add);
    }
    else if (windowWidth > 320) {
      setIsDisplayMovies(displaySettings.mobile.movies);
      setIsAddMovies(displaySettings.mobile.add);
    }
  }

  function addMovies() {
    setIsDisplayMovies(isDisplayMovies + isAddMovies);
  }

  useEffect(() => {
    displayMovies(window.innerWidth);
    window.addEventListener('resize', handleDisplay);
    return () => window.removeEventListener('resize', handleDisplay);
  }, // eslint-disable-next-line
    []);

  function handleDisplay(evt) {
    displayMovies(evt.currentTarget.innerWidth);
  }

  return (
    <section className='movies-card-list'>
      <ul className='movies-card-list__list'>
        {displaySetting === 'movies'
          ? movies.slice(0, isDisplayMovies).map((movie) => {
            return (
              <MoviesCard
                key={movie.id}
                nameRu={movie.nameRU}
                duration={movie.duration}
                image={'https://api.nomoreparties.co/' + movie.image.url}
                displaySetting='movies'
              />
            );
          })
          : movies.map((movie) => {
            return (
              <MoviesCard
                key={movie.id}
                nameRu={movie.nameRU}
                duration={movie.duration}
                image={'https://api.nomoreparties.co/' + movie.image.url}
                displaySetting='savedMovies'
              />
            );
          })}
      </ul>
      {
        movies.length > isDisplayMovies && displaySetting === 'movies'
          ? <MoreButton addMovies={addMovies} />
          : <MoreButton hideButton={true} />
      }
    </section>
  );
}