import React from 'react';
import './SearchForm.css';

export default function SearchForm() {
  return (
    <section className='search-form'>
      <form className='search-form__container'>
        <input
          className='search-form__input'
          type='text'
          placeholder='Фильм'
          required
        />
        <button
          className='search-form__button'
          type='submit'
          aria-label='Поиск'
        />
      </form>
      <div className='search-form__checkbox-container'>
        <input
          className='search-form__checkbox'
          type='checkbox'
          id='custom-checkbox'
          value='yes'
        />
        <label htmlFor='custom-checkbox' className='search-form__label'>Короткометражки</label>
      </div>
    </section>
  );
}