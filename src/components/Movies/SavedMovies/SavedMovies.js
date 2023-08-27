import React from 'react';
import Header from '../../Common/Header/Header';
import Footer from '../../Common/Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

export default function SavedMovies() {
  return (
    <>
      <Header
        isLogin={true}
      />
      <main className='saved-movies'>
        <SearchForm />
        <MoviesCardList />
      </main>
      <Footer />
    </>
  );
}