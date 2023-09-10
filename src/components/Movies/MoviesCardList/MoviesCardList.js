import React, { useState, useEffect, useContext } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoreButton from '../MoreButton/MoreButton';
import { SavedMoviesContext } from '../../../contexts/SavedMoviesContext';
import { displaySettings } from '../../../utils/utils';
import './MoviesCardList.css';

export default function MoviesCardList({ movies, displaySetting, handleAddMovies, handleDeleteSavedMovies }) {
  const savedMovies = useContext(SavedMoviesContext);

  const [isDisplayMovies, setIsDisplayMovies] = useState(0);

  function displayMovies() {
    const display = window.innerWidth;
    if (display > 768) {
      setIsDisplayMovies(displaySettings.main.movies);
    }
    else if (display > 480) {
      setIsDisplayMovies(displaySettings.pad.movies);
    }
    else if (display > 319) {
      setIsDisplayMovies(displaySettings.mobile.movies);
    }
  }

  function addMovies() {
    const display = window.innerWidth;
    if (display > 768) {
      setIsDisplayMovies(isDisplayMovies + displaySettings.main.add);
    } else if (display > 480) {
      setIsDisplayMovies(isDisplayMovies + displaySettings.pad.add);
    } else if (display > 319) {
      setIsDisplayMovies(isDisplayMovies + displaySettings.mobile.add);
    }
  }

  useEffect(() => {
    displayMovies();
  }, [movies]);

  useEffect(() => {
    window.addEventListener('resize', displayMovies);
    return () => window.removeEventListener('resize', displayMovies);
  }, []);

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