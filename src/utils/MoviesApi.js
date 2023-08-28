import { moviesApiConfig } from "./utils.js";

class MoviesApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  // Проверяем результат запроса
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Произошла ошибка ${res.status}.`);
    }
  }

  // Запрашиваем карточки с фильмами
  getMovies() {
    return fetch(`${this._url}/beatfilm-movies`, {
      method: "GET",
      headers: this._headers
    })
      .then((res) => this._checkResponse(res));
  }
}

const moviesApi = new MoviesApi(moviesApiConfig);

export default moviesApi;