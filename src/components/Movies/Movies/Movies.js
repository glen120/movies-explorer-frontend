import React from 'react';
import Header from '../../Common/Header/Header';
import Footer from '../../Common/Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreButton from '../MoreButton/MoreButton';
import './Movies.css';

export default function Movies() {
  return (
    <>
      <Header
        isLogin={true}
      />
      <main className='movies'>
        <SearchForm />
        <MoviesCardList />
        <MoreButton />
      </main>
      <Footer />
    </>
  );
}