import * as types from '../actions/actionTypes';

const initialState = {
  movies: [],
  loaded: false
};

const fetchData = (state) => {
  const API_KEY = '7waqfqbprs7pajbz28mqf6vz';
  const API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
  const PAGE_SIZE = 25;
  const PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
  const REQUEST_URL = API_URL + PARAMS;
  return fetch(REQUEST_URL);
}

export default function movie(state = initialState, action = {}) {
  switch (action.type) {
    case types.REQUEST_MOVIES:
      return fetchData(state)
        .then((response) => response.json())
        .then((responseData) => {
          console.log('recive');
          return Object.assign({}, {
            state,
            movies: responseData.movies,
            loaded: true,
          });
        })
      .done();
    case types.RECIVE_MOVIES:
      return {
        ...state,
        movies: state.movies,
        loaded: true
      };
    case types.DECREMENT:
      return {
        ...state,
        count: state.count - 1
      };
    default:
      return state;
  }
}
