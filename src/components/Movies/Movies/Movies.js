import React, { useState, useEffect } from 'react';
import Header from '../../Common/Header/Header';
import Footer from '../../Common/Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesError from '../MoviesError/MoviesError';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../../utils/MoviesApi';
import { shortMovieDuration, notFoundMessage, renderErrorMessage } from '../../../utils/utils'
import './Movies.css';

export default function Movies({ isLogin }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPreloader, setIsPreloader] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState('');

  function searchMovies() {
    const moviesData = JSON.parse(localStorage.getItem('moviesData'));
    const searchRequest = localStorage.getItem('searchRequest').toLowerCase();
    const shortMovieSearch = localStorage.getItem('shortMovieSearch');
    const foundMovies = moviesData.filter((movie) => movie.nameRU.toLowerCase().indexOf(searchRequest) >= 0);
    if (shortMovieSearch === 'true')
    {
      return foundMovies.filter((movie) => movie.duration < shortMovieDuration);
    } else
      {
      return foundMovies;
      }
  }

  function loadingMovies() {
    const foundMovies = searchMovies();
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

  function submitSearchMovies(searchRequest, shortMovieSearch) {
    localStorage.setItem('searchRequest', searchRequest);
    localStorage.setItem('shortMovieSearch', shortMovieSearch);
    setIsPreloader(true);
    if (!localStorage.getItem('moviesData'))
    {
      moviesApi.getMovies()
        .then((searchResult) => {
          localStorage.setItem('moviesData', JSON.stringify(searchResult));
          loadingMovies();
        })
        .catch(() => {
          setIsErrorMessage(renderErrorMessage);
          setIsPreloader(false);
        });
    }
    else loadingMovies();
  }

  function clickOnShortMovies(shortMovieSearch) {
    localStorage.setItem('shortMovieSearch', shortMovieSearch);
    if (localStorage.getItem('moviesData'))
    {
      loadingMovies();
    }
  }

  useEffect(() => {
    if (localStorage.getItem('moviesData'))
    {
      setIsPreloader(true);
      setIsLoading(true);
      loadingMovies();
    }}, // eslint-disable-next-line
    []);

  return (
    <>
      <Header
        isLogin={isLogin}
      />
      <main className='movies'>
        <SearchForm
          displaySetting={'movies'}
          submitSearchMovies={submitSearchMovies}
          clickOnShortMovies={clickOnShortMovies}
        />
        {isPreloader ? <Preloader /> :
          isLoading ?
            <MoviesCardList
              movies={movies}
              displaySetting={'movies'}
            />
            : isErrorMessage && <MoviesError
            isErrorMessage={isErrorMessage}
          />
        }
      </main>
      <Footer />
    </>
  );
}