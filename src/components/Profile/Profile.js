import React, {useContext, useEffect, useState} from 'react';
import Header from '../Common/Header/Header';
import { CurrentUserContext} from '../../contexts/CurrentUserContext';
import './Profile.css';
import {NavLink} from "react-router-dom";

export default function Profile( { isLogin, isLogout, updateUser, infoMessage }) {
  const currentUser = useContext(CurrentUserContext);

  const [isEdit, setIsEdit] = useState(false);

  const [isValid, setIsValid] = useState(false);
  const [userData, setUserData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setUserData({
      name: currentUser.name,
      email: currentUser.email
    })
  }, [currentUser]);

  function handleChange(evt) {
    const input = evt.target;
    const { value, name } = input;
    if (name === 'name' && input.validity.patternMismatch) {
      input.setCustomValidity('Имя не должно содержать пробел, дефис и иных знаков препинания');
    } else {
      input.setCustomValidity('');
    }
    setUserData({...userData, [name]: value});
    setErrors({ ...errors, [name]: input.validationMessage });
    setIsValid(input.closest('form').checkValidity());
  }

  function handleEdit(evt) {
    evt.preventDefault();
    setIsEdit(true);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    updateUser(userData);
    setIsEdit(false);
    setIsValid(false);
  }

  useEffect(() => {
    if (currentUser.name === userData.name && currentUser.email === userData.email) {
      setIsValid(false);
    }// eslint-disable-next-line
  }, [userData]);

  return (
    <>
      <Header
        isLogin={isLogin}
      />
      <section className='profile'>
        <h1 className='profile__title'>Привет, {userData.name}!</h1>
        <form className='profile__form' onSubmit={handleSubmit} noValidate>
          <span className={`profile__form-validation profile__form-validation_${!isValid ? 'active' : ''}`}>{errors.name}</span>
          <label className='profile__data-container'>
            <p className="profile__input-name">Имя</p>
            <input
              className='profile__input'
              type='text'
              name='name'
              placeholder='Ваше имя'
              minLength='2'
              maxLength='30'
              pattern='^[а-яА-ЯёЁa-zA-Z0-9]+$'
              value={userData.name ?? ''}
              onChange={handleChange}
              required
              disabled={!isEdit}
            />
          </label>
          <label className='profile__data-container'>
            <p className="profile__input-name">E-mail</p>
            <input
              className='profile__input'
              type='text'
              name='email'
              placeholder='Ваш email'
              minLength='2'
              maxLength='50'
              pattern='^[^ ]+@[^ ]+\.[a-z]{2,3}$'
              value={userData.email ?? ''}
              onChange={handleChange}
              required
              disabled={!isEdit}
            />
          </label>
          <span className={`profile__form-validation profile__form-validation_${!isValid ? 'active' : ''}`}>{errors.email}</span>

          {isEdit && (
            <div className='profile__button'>
              <span className='profile__error-message'>{infoMessage}</span>
              <button className={`profile__submit-button profile__submit-button_${!isValid ? 'disable' : ''}`} type='submit' onClick={handleSubmit} disabled={!isValid}>Сохранить</button>
            </div>
          )}
        </form>

        {!isEdit && (
          <div className='profile__links'>
            <span className='profile__error-message profile__error-message_success'>{infoMessage}</span>
            <button className='profile__edit-button' type='button' onClick={handleEdit}>Редактировать</button>
            <NavLink to='/' className='profile__logout-link'>
              <button className='profile__logout-button' type='button' onClick={isLogout}>Выйти из аккаунта</button>
            </NavLink>
          </div>
        )}
      </section>
    </>
  );
}