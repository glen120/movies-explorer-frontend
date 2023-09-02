import React, {useState} from 'react';
import Logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import './Login.css';

export default function Login({ handleLogin, infoMessage }) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

  function handleChange(evt) {
    const {name, value} = evt.target;
    setFormValue({...formValue, [name]: value});
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleLogin(formValue);
  }

  return (
    <section className='login'>
      <Link to='/' className='login__logo-link'>
        <img src={Logo} className='login__logo' alt='Логотип приложения' />
      </Link>
      <h1 className='login__title'>Рады видеть!</h1>
      <form className='login__form' onSubmit={handleSubmit} noValidate>
        <label className='login__form-label'>E-mail
          <input
            className='login__input'
            type='email'
            name='email'
            placeholder='Введите ваш email'
            minLength='5'
            maxLength='50'
            value={formValue.email}
            onChange={handleChange}
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
            value={formValue.password}
            onChange={handleChange}
            required
          />
        </label>
        <span className='login__form-error'>{infoMessage}</span>
        <button className='login__form-button' type='submit'>Войти</button>
      </form>
      <p className="login__text">Ещё не зарегистрированы?
        <Link to="/signup" className="login__link"> Регистрация</Link>
      </p>
    </section>
  );
}