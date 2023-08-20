import React from 'react';
import Logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import './Login.css';

export default function Login() {
  return (
    <section className='login'>
      <Link to='/' className='login__logo-link'>
        <img src={Logo} className='login__logo' alt='Логотип приложения' />
      </Link>
      <h1 className='login__title'>Рады видеть!</h1>
      <form className='login__form' noValidate>
        <label className='login__form-label'>E-mail
          <input
            className='login__input'
            type='email'
            name='email'
            placeholder='Введите ваш email'
            minLength='5'
            maxLength='50'
            required
          />
        </label>
        <label className='login__form-label'>Пароль
          <input
            className='login__input'
            type='password'
            name='password'
            placeholder='Введите пароль'
            minLength='4'
            maxLength='30'
            required
          />
        </label>
        <button className='login__form-button' type='submit'>Войти</button>
      </form>
      <p className="login__text">Ещё не зарегистрированы?
        <Link to="/signup" className="login__link"> Регистрация</Link>
      </p>
    </section>
  );
}