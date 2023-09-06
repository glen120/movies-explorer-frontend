import React, {useEffect, useState, useContext} from 'react';
import Header from '../../Common/Header/Header';
import Footer from '../../Common/Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import MoviesError from '../MoviesError/MoviesError';
import { SavedMoviesContext } from '../../../contexts/SavedMoviesContext';
import {notFoundMessage, shortMovieDuration} from '../../../utils/utils';
import './SavedMovies.css';

export default function SavedMovies({ isLogin, handleDeleteSavedMovies }) {
  const savedMovies = useContext(SavedMoviesContext);

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPreloader, setIsPreloader] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState('');

  function searchSavedMovies(savedMovies) {
    const searchSavedMovies = localStorage.getItem('searchSavedMovies').toLowerCase();
    const shortSavedMovieSearch = localStorage.getItem('shortSavedMovieSearch');
    const foundMovies = savedMovies.filter((movie) => movie.nameRU.toLowerCase().indexOf(searchSavedMovies) >= 0);
    if (shortSavedMovieSearch === 'true')
    {
      return foundMovies.filter((movie) => movie.duration < shortMovieDuration);
    } else
    {
      return foundMovies;
    }
  }

  function loadingSavedMovies() {
    const foundMovies = searchSavedMovies(savedMovies);
    setIsPreloader(false);
    if (foundMovies.length === 0)
    {
      setIsErrorMessage(notFoundMessage);
      setIsLoading(false);
    } else
    {
      setMovies(foundMovies);
      setIsLoading(true);
    }
  }

  function submitSearchSavedMovies(searchSavedMovies, shortSavedMovieSearch) {
    localStorage.setItem('searchSavedMovies', searchSavedMovies);
    localStorage.setItem('shortSavedMovieSearch', shortSavedMovieSearch);
    loadingSavedMovies();
  }

  function clickOnShortSavedMovies(shortSavedMovieSearch) {
    localStorage.setItem('shortSavedMovieSearch', shortSavedMovieSearch);
    loadingSavedMovies();
  }

  useEffect(() => {
    setIsPreloader(true);
    setIsLoading(true);
    loadingSavedMovies();
    }, // eslint-disable-next-line
    [savedMovies]);

  return (
    <>
      <Header
        isLogin={isLogin}
      />
      <main className='saved-movies'>
        <SearchForm
          displaySetting={'savedMovies'}
          submitSearchMovies={submitSearchSavedMovies}
          clickOnShortMovies={clickOnShortSavedMovies}
        />
        {isPreloader ? <Preloader /> :
          isLoading ?
            <MoviesCardList
              movies={movies}
              displaySetting={'savedMovies'}
              handleDeleteSavedMovies={handleDeleteSavedMovies}
            />
            : isErrorMessage &&
            <MoviesError
              isErrorMessage={isErrorMessage}
            />
        }
      </main>
      <Footer />
    </>
  );
}