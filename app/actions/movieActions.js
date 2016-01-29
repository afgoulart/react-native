import * as types from './actionTypes';

export function selectTheaters(theaters) {
  return {
    type: SELECT_THEATERS,
    theaters
  }
}

export function invalidateTheaters(theaters) {
  return {
    type: INVALIDATE_THEATERS,
    theaters
  }
}

function requestMovies(theaters) {
  return {
    type: REQUEST_POSTS,
    theaters
  }
}

function receiveMovies(theaters, json) {
  return {
    type: RECEIVE_POSTS,
    theaters,
    movies: json.data.children.map(child => child.movies),
    receivedAt: Date.now()
  }
}

function fetchMovies(theaters) {
  const API_KEY = '7waqfqbprs7pajbz28mqf6vz';
  const API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
  const PAGE_SIZE = 25;
  const PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
  const REQUEST_URL = API_URL + PARAMS;

  return dispatch => {
    dispatch(requestMovies(theaters))
    return fetch(REQUEST_URL)
      .then(req => req.json())
      .then(json => dispatch(receiveMovies(theaters, json)))
  }
}

function shouldFetchMovies(state, theaters) {
  const movies = state.moviesByTheaters[theaters]
  if (!movies) {
    return true
  } else if (movies.isFetching) {
    return false
  } else {
    return movies.didInvalidate
  }
}

export function fetchMoviesIfNeeded(theaters) {
  return (dispatch, getState) => {
    if (shouldFetchMovies(getState(), theaters)) {
      return dispatch(fetchMovies(theaters))
    }
  }
}