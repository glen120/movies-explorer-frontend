import React, { useState } from 'react';
import Logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
/*import {errorName, errorEmail} from '../../utils/utils';*/
import './Register.css';

export default function Register({ handleRegister, infoMessage }) {
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({});
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  function handleChange(evt) {
    const input = evt.target;
    const { value, name } = input;
    if (name === 'name' && input.validity.patternMismatch) {
      input.setCustomValidity('Имя не должно содержать пробел, дефис и иных знаков препинания');
    } else {
      input.setCustomValidity('');
    }
    setFormValue({...formValue, [name]: value});
    setErrors({ ...errors, [name]: input.validationMessage });
    setIsValid(input.closest('form').checkValidity());
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleRegister(formValue);
    setIsValid(false);
  }

  return (
    <section className='register'>
      <Link to='/' className='register__logo-link'>
        <img src={Logo} className='register__logo' alt='Логотип приложения' />
      </Link>
      <h1 className='register__title'>Добро пожаловать!</h1>
      <form className='register__form' onSubmit={handleSubmit} noValidate>
        <label className='register__form-label'>Имя
          <input
            className='register__input'
            type='text'
            name='name'
            placeholder='Введите ваше имя'
            minLength='2'
            maxLength='30'
            pattern='^[а-яА-ЯёЁa-zA-Z0-9]+$'
            value={formValue.name}
            onChange={handleChange}
            required
          />
          <span className={`register__form-validation register__form-validation_${!isValid ? 'active' : ''}`}>{errors.name}</span>
        </label>
        <label className='register__form-label'>E-mail
          <input
            className='register__input'
            type='email'
            name='email'
            placeholder='Введите ваш email'
            minLength='5'
            maxLength='50'
            pattern='^[^ ]+@[^ ]+\.[a-z]{2,3}$'
            value={formValue.email}
            onChange={handleChange}
            required
          />
          <span className={`register__form-validation register__form-validation_${!isValid ? 'active' : ''}`}>{errors.email}</span>
        </label>
        <label className='register__form-label'>Пароль
          <input
            className='register__input'
            type='password'
            name='password'
            placeholder='Введите пароль'
            minLength='4'
            maxLength='30'
            value={formValue.password}
            onChange={handleChange}
            required
          />
          <span className={`register__form-validation register__form-validation_${!isValid ? 'active' : ''}`}>{errors.password}</span>
        </label>
        <span className='register__form-error'>{infoMessage}</span>
        <button
          className={`register__form-button register__form-button_${!isValid ? 'disable' : ''}`} type='submit' disabled={!isValid}>Зарегистрироваться</button>
      </form>
      <p className="register__text">Уже зарегистрированы?
        <Link to="/signin" className="register__link"> Войти</Link>
      </p>
    </section>
  );
}