import React, { useEffect, useState } from 'react';
import './SearchForm.css';

export default function SearchForm({ submitSearchMovies, onClickShortMovies }) {
  const [isSearchValue, setIsSearchValue] = useState('');
  const [isShortMovieSearch, setIsShortMovieSearch] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [isErrorShown, setIsErrorShown] = React.useState(false);

  useEffect(() => {
      const searchRequest = localStorage.getItem('searchRequest');
      const shortMovieSearch = localStorage.getItem('shortMovieSearch');
      if (searchRequest && shortMovieSearch)
      {
        setIsSearchValue(searchRequest);
        shortMovieSearch === 'true' ? setIsShortMovieSearch(true) : setIsShortMovieSearch(false);
      }
    },
    []);

  function handleSubmitSearch(evt) {
    evt.preventDefault();
    if (isSearchValue === '') {
      setError('Введите поисковый запрос');
      setIsErrorShown(true);
    }
    else if (isSearchValue === localStorage.getItem('searchRequest'))
      {
        setError('Введите новый поисковый запрос');
        setIsErrorShown(true);
      }
    else {
      submitSearchMovies(isSearchValue, isShortMovieSearch);
      setIsErrorShown(false);
    }
  }

  function handleCheckboxChange() {
    if (isSearchValue === '') {
      setError('Введите поисковый запрос');
      setIsErrorShown(true);
    }
    else
      {
        onClickShortMovies(!isShortMovieSearch);
        setIsShortMovieSearch(!isShortMovieSearch);
        setIsErrorShown(false);
      }
  }

  function handleInputChange(evt) {
    setIsSearchValue(evt.target.value);
  }

  function setError(text) {
    setErrorText(text);
  }

  return (
    <section className='search-form'>
      <form className='search-form__container' onSubmit={handleSubmitSearch} noValidate>
        <input
          className='search-form__input'
          type='text'
          name='movieSearch'
          placeholder='Фильм'
          value={isSearchValue}
          onChange={handleInputChange}
          required
        />
        <button
          className='search-form__button'
          type='submit'
          aria-label='Поиск'
        />
      </form>
      <span className='search-form__error'>{isErrorShown && errorText}</span>
      <div className='search-form__checkbox-container'>
        <input
          className='search-form__checkbox'
          type='checkbox'
          id='custom-checkbox'
          name='shortMovieSearch'
          value='shortMovieSearch'
          checked={isShortMovieSearch}
          onChange={handleCheckboxChange}
        />
        <label htmlFor='custom-checkbox' className='search-form__label'>Короткометражки</label>
      </div>
    </section>
  );
}