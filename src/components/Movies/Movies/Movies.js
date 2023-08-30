import React, {useState, useEffect} from 'react';
import Header from '../../Common/Header/Header';
import Footer from '../../Common/Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesError from '../MoviesError/MoviesError';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../../utils/MoviesApi';
import { shortMovieDuration, notFoundMessage, renderErrorMessage } from '../../../utils/utils'
import './Movies.css';

export default function Movies() {
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
    }
    else
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
          setIsPreloader(false);
          setIsErrorMessage(renderErrorMessage);
        });
    }
    else loadingMovies();
  }

  function onClickShortMovies(shortMovieSearch) {
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
    }
  }, []);

  return (
    <>
      <Header
        isLogin={true}
      />
      <main className='movies'>
        <SearchForm
          submitSearchMovies={submitSearchMovies}
          onClickShortMovies={onClickShortMovies}
        />
        {isPreloader ? <Preloader /> :
          isLoading ?
            <MoviesCardList
              movies={movies}
              type={'all'}
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