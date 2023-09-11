import React from 'react';
import './MoviesError.css';

export default function MoviesError({ isErrorMessage }) {
  return (
    <section className='movies-error'>
      <p className='movies-error__message'>{isErrorMessage}</p>
    </section>
  );
}