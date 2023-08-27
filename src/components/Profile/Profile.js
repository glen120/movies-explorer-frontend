import React from 'react';
import Header from '../Common/Header/Header';
import './Profile.css';
import {NavLink} from "react-router-dom";

export default function Profile() {
  const [isEdit, setIsEdit] = React.useState(false);

  function handleSubmit(evt) {
    evt.preventDefault();
    setIsEdit(false);
  }

  function handleEdit(evt) {
    evt.preventDefault();
    setIsEdit(true);
  }

  return (
    <>
      <Header
        isLogin={true}
      />
      <section className='profile'>
        <h1 className='profile__title'>Привет, Сергей!</h1>
        <form className='profile__form' noValidate>
          <label className='profile__data-container'>
            <p className="profile__input-name">Имя</p>
            <input
              className='profile__input'
              type='text'
              name='name'
              placeholder='Ваше имя'
              minLength='2'
              maxLength='30'
              defaultValue='Сергей'
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
              defaultValue='pochta@yandex.ru'
              required
              disabled={!isEdit}
            />
          </label>

          {isEdit && (
            <div className='profile__button'>
              <span className='profile__error-message'>При обновлении профиля произошла ошибка</span>
              <button className='profile__submit-button' type='submit' onClick={handleSubmit}>Сохранить</button>
            </div>
          )}
        </form>

        {!isEdit && (
          <div className='profile__links'>
            <button className='profile__edit-button' type='button' onClick={handleEdit}>Редактировать</button>
            <NavLink to='/' className='profile__logout-link'>
              <button className='profile__logout-button'>Выйти из аккаунта</button>
            </NavLink>
          </div>
        )}
      </section>
    </>
  );
}