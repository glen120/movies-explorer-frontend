import React from 'react';
import Logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import './Register.css';

export default function Register() {
  return (
    <section className='register'>
      <Link to='/' className='register__logo-link'>
        <img src={Logo} className='register__logo' alt='Логотип приложения' />
      </Link>
      <h1 className='register__title'>Добро пожаловать!</h1>
      <form className='register__form' noValidate>
        <label className='register__form-label'>Имя
          <input
            className='register__input'
            type='text'
            name='name'
            placeholder='Введите ваше имя'
            minLength='2'
            maxLength='30'
            required
          />
        </label>
        <label className='register__form-label'>E-mail
          <input
            className='register__input'
            type='email'
            name='email'
            placeholder='Введите ваш email'
            minLength='5'
            maxLength='50'
            required
          />
        </label>
        <label className='register__form-label'>Пароль
          <input
            className='register__input'
            type='password'
            name='password'
            placeholder='Введите пароль'
            minLength='4'
            maxLength='30'
            required
          />
        </label>
        <span className='register__form-error'>Что-то пошло не так...</span>
        <button className='register__form-button' type='submit'>Зарегистрироваться</button>
      </form>
      <p className="register__text">Уже зарегистрированы?
        <Link to="/signin" className="register__link"> Войти</Link>
      </p>
    </section>
  );
}