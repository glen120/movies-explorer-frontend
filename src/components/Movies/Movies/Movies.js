import React from 'react';
import Header from '../../Common/Header/Header';
import Footer from '../../Common/Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';

export default function Movies({ isLogin=true }) {
  return (
    <>
      <Header isLogin={isLogin} />
      <main className='movies'>
        <SearchForm />
        <MoviesCardList />
      </main>
      <Footer />
    </>
  );
}