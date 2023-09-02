import React, { useContext, useEffect } from 'react';
import Header from '../Common/Header/Header';
import { CurrentUserContext} from '../../contexts/CurrentUserContext';
import './Profile.css';
import {NavLink} from "react-router-dom";

export default function Profile( { isLogin, isLogout, updateUser, infoMessage }) {
  const currentUser = useContext(CurrentUserContext);

  const [isEdit, setIsEdit] = React.useState(false);

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handleEdit(evt) {
    evt.preventDefault();
    setIsEdit(true);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    updateUser({name, email});
    setIsEdit(false);
  }

  return (
    <>
      <Header
        isLogin={isLogin}
      />
      <section className='profile'>
        <h1 className='profile__title'>Привет, {name}!</h1>
        <form className='profile__form' onSubmit={handleSubmit} noValidate>
          <label className='profile__data-container'>
            <p className="profile__input-name">Имя</p>
            <input
              className='profile__input'
              type='text'
              name='name'
              placeholder='Ваше имя'
              minLength='2'
              maxLength='30'
              value={name ?? ''}
              onChange={handleNameChange}
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
              value={email ?? ''}
              onChange={handleEmailChange}
              required
              disabled={!isEdit}
            />
          </label>

          {isEdit && (
            <div className='profile__button'>
              <span className='profile__error-message'>{infoMessage}</span>
              <button className='profile__submit-button' type='submit' onClick={handleSubmit}>Сохранить</button>
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