import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoreButton from '../MoreButton/MoreButton';
import './MoviesCardList.css';

export default function MoviesCardList({ movies, type }) {
  return (
    <section className='movies-card-list'>
      <ul className='movies-card-list__list'>
        {movies.map((movie) => {
          return (
            <MoviesCard
              key={movie.id}
              nameRu={movie.nameRU}
              duration={movie.duration}
              image={'https://api.nomoreparties.co/' + movie.image.url}
              type={type}
              />
          );
        })
        }
      </ul>
      <MoreButton />
    </section>
  );
}