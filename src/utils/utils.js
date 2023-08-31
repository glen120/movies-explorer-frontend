export const moviesApiConfig = {
  url: 'https://api.nomoreparties.co',
  headers: {
    'Content-type': 'application/json',
  }
};

export const mainApiConfig = {
  url: 'https://movies-api.glen120.nomoreparties.co',
  headers: {
    'Accept': 'application/json',
    'Content-type': 'application/json',
  }
};

export const minutesInHour = 60;
export const shortMovieDuration = 40;

export const notFoundMessage = 'Ничего не найдено';
export const renderErrorMessage = `Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен.
Подождите немного и попробуйте ещё раз`;

export const displaySettings = {
  main: {
    movies: 12,
    add: 6
  },
  pad: {
    movies: 8,
    add: 2
  },
  mobile: {
    movies: 5,
    add: 2
  }
}