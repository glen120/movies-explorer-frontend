import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard'
import testCards from '../../../utils/TestCards'
import './MoviesCardList.css';

export default function MoviesCardList() {
  const [movies, setMovies] = React.useState([]);

  function getMovies() {
    setMovies(testCards);
  }

  React.useEffect(() => {
    getMovies();
  }, []);

  return (
    <section className='movies-card-list'>
      <ul className='movies-card-list__list'>
        {movies.map((movie) => {
          return (
            <MoviesCard
              key={movie.id}
              image={movie.image}
              name={movie.name}
              duration={movie.duration}
              />
          );
        })
        }
      </ul>
    </section>
  );
}