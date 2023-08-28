import React, {useState, useEffect} from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import moviesApi from '../../../utils/MoviesApi';
import './MoviesCardList.css';

export default function MoviesCardList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    Promise.all([ moviesApi.getMovies() ])
      .then(([ movies ]) => {
        setMovies(movies);
      })
      .catch((err) => console.log(err));
    },
  []);

  return (
    <section className='movies-card-list'>
      <ul className='movies-card-list__list'>
        {movies.map((movie) => {
          return (
            <MoviesCard
              key={movie.id}
              name={movie.nameRU}
              duration={movie.duration}
              image={'https://api.nomoreparties.co/' + movie.image.url}
              />
          );
        })
        }
      </ul>
    </section>
  );
}