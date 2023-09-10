import React, { useState, useEffect, useContext } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoreButton from '../MoreButton/MoreButton';
import { SavedMoviesContext } from '../../../contexts/SavedMoviesContext';
import { displaySettings } from '../../../utils/utils';
import './MoviesCardList.css';

export default function MoviesCardList({ movies, displaySetting, handleAddMovies, handleDeleteSavedMovies }) {
  const savedMovies = useContext(SavedMoviesContext);

  const [isDisplayMovies, setIsDisplayMovies] = useState(0);
  const [isAddMovies, setIsAddMovies] = useState(0);

  function displayMovies(windowWidth) {
    if (windowWidth > 768) {
      setIsDisplayMovies(displaySettings.main.movies);
      setIsAddMovies(displaySettings.main.add);
    }
    else if (windowWidth > 480) {
      setIsDisplayMovies(displaySettings.pad.movies);
      setIsAddMovies(displaySettings.pad.add);
    }
    else if (windowWidth > 319) {
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

  function checkIsMovieSaved(savedMovies, movie) {
    return savedMovies.find((item) => {
      return item.movieId === (movie.id || movie.movieId);
    });
  }


  return (
    <section className='movies-card-list'>
      <ul className='movies-card-list__list'>
        {displaySetting === 'movies'
          ? movies.slice(0, isDisplayMovies).map((movie) => {
            return (
              <MoviesCard
                key={movie.id}
                movie={movie}
                isSaved={checkIsMovieSaved(savedMovies, movie)}
                handleAddMovies={handleAddMovies}
                handleDeleteSavedMovies={handleDeleteSavedMovies}
              />
            );
          })
          : movies.map((movie) => {
            return (
              <MoviesCard
                key={movie.movieId}
                movie={movie}
                handleDeleteSavedMovies={handleDeleteSavedMovies}
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