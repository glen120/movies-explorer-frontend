import React from 'react';
import { Link } from 'react-router-dom';
import './Page404.css';

export default function Page404() {
  return (
    <section className='page404'>
      <h1 className='page404__title'>404</h1>
      <p className='page404__subtitle'>Страница не найдена</p>
      <Link to={-1} className='page404__link'>Назад</Link>
    </section>
  );
}