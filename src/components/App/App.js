import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Main from '../Main/Main/Main';
import Movies from '../Movies/Movies/Movies';
import SavedMovies from '../Movies/SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Page404 from '../Page404/Page404';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { SavedMoviesContext } from '../../contexts/SavedMoviesContext';
import mainApi from '../../utils/MainApi';
import { conflictError, conflictErrorMessage, unauthorizedError, unauthorizedErrorMessage,
  serverErrorMessage, updateUserSuccess } from '../../utils/utils';
import './App.css';

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [infoMessage, setInfoMessage] = useState( '');

  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);

  const navigate = useNavigate();

  // Функция, регистрирующая пользователя
  function handleRegister(regData) {
    const email = regData.email;
    const password = regData.password;
    mainApi.register(regData)
      .then(() => {
        handleLogin({ email, password });
        navigate('/movies');
      })
      .catch((err) => {
        if (err === conflictError) {
          setInfoMessage(conflictErrorMessage);
        } else {
          setInfoMessage(serverErrorMessage);
        }
      });
  }

  // Функция, авторизующая пользователя
  function handleLogin(loginData) {
    mainApi.authorize(loginData)
      .then((res) => {
        mainApi.setToken(res.token);
        localStorage.setItem('token', res.token);
        setIsLogin(true);
        navigate('/movies');
      })
      .catch((err) => {
        if (err === unauthorizedError) {
          setInfoMessage(unauthorizedErrorMessage);
        } else {
          setInfoMessage(serverErrorMessage);
        }
      });
  }

  // Проверка токена
  useEffect(() => {
    const token = localStorage.getItem('token');
    mainApi.setToken(token);
      if (token) {
        Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies()])
          .then(([userData, savedMovies]) => {
            setCurrentUser(userData);
            setSavedMovies(savedMovies);
            setIsLogin(true);
          })
          .catch((err) => {
            handleLogout();
            console.log(err);
          });
      } else {
        setIsLogin(false);
      }
    }, // eslint-disable-next-line
    [isLogin]);

  // Функция выхода из профиля
  function handleLogout() {
    setIsLogin(false);
    localStorage.removeItem('token');
    localStorage.removeItem('moviesData');
    localStorage.removeItem('searchRequest');
    localStorage.removeItem('shortMovieSearch');
    mainApi.setToken(null);
    setCurrentUser(null);
    navigate('/');
  }

  // Функция, изменяющая данные профиля
  function handleUpdateUser(userData) {
    mainApi.editProfile(userData)
      .then((res) => {
        setCurrentUser(res);
        setInfoMessage(updateUserSuccess);
      })
      .catch((err) => {
        if (err === conflictError) {
          setInfoMessage(conflictErrorMessage);
        } else {
          setInfoMessage(serverErrorMessage);
        }
      })
      .finally(() => {
        setTimeout(() => setInfoMessage(''), 5000);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SavedMoviesContext.Provider value={savedMovies}>
        <Routes>
          <Route
            path='/'
            element={<Main
              isLogin={isLogin}
              />}
          />
          <Route
            path='/movies'
            element={<ProtectedRoute
              element={Movies}
              isLogin={isLogin}
            />}
          />
          <Route
            path='/saved-movies'
            element={<ProtectedRoute
              element={SavedMovies}
              isLogin={isLogin}
            />}
          />
          <Route
            path='/profile'
            element={<ProtectedRoute
              element={Profile}
              isLogin={isLogin}
              isLogout={handleLogout}
              updateUser={handleUpdateUser}
              infoMessage={infoMessage}
            />}
          />
          <Route
            path='/signup'
            element={<Register
              handleRegister={handleRegister}
              infoMessage={infoMessage}
            />}
          />
          <Route
            path='/signin'
            element={<Login
              handleLogin={handleLogin}
              infoMessage={infoMessage}
            />}
          />
          <Route path='*' element={<Page404 />} />
        </Routes>
      </SavedMoviesContext.Provider>
    </CurrentUserContext.Provider>
  );
}