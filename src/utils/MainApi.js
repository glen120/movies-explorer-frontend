import { mainApiConfig } from './utils';

class MainApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  // Проверяем результат запроса
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }

  // Регистрируем пользователя
  register(body) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(body)
    })
      .then((res) => this._checkResponse(res));
  }

  // Авторизуем пользователя
  authorize(body) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(body)
    })
      .then((res) => this._checkResponse(res));
  }

  // Устанавливаем токен
  setToken(token) {
    this._headers.Authorization = `Bearer ${token}`;
  }

  // Запрашиваем данные пользователя
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
      .then((res) => this._checkResponse(res));
  }

  // Редактируем данные пользователя
  editProfile(body) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(body)
    })
      .then((res) => this._checkResponse(res));
  }

  // Сохраняем фильм
  saveMovie(body) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(body)
    })
      .then((res) => this._checkResponse(res));
  }

  // Удаляем фильм
  deleteMovie(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((res) => this._checkResponse(res));
  }

  // Запрашиваем сохраненные фильмы
  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: this._headers,
    })
      .then((res) => this._checkResponse(res));
  }
}

const mainApi = new MainApi(mainApiConfig);

export default mainApi;