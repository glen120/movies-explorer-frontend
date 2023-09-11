import React from 'react';
import './MoreButton.css';

export default function MoreButton({ addMovies, hideButton = false }) {
  return (
    <section className='more-button'>
      <button
        className={`more-button__button ${hideButton && 'more-button__button_hide'}`}
        type='button'
        onClick={addMovies}>Ещё</button>
    </section>
  );
}