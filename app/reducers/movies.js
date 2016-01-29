
import { combineReducers } from 'redux';
import {
  SELECT_THEATERS, INVALIDATE_THEATERS,
  REQUEST_MOVIES, RECEIVE_MOVIES
} from './../actions/movieActions';

const initialState = {
  isFetching: false,
  didInvalidate: false,
  movies: []
};

function selectedTheaters(state = 'reactjs', action) {
  switch (action.type) {
  case SELECT_THEATERS:
    return action.theaters
  default:
    return state
  }
}

function movies(state = initialState, action = {}) {
  switch (action.type) {
    case INVALIDATE_THEATERS:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_MOVIES:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_MOVIES:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        movies: action.movies,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function moviesByTheaters(state = { }, action) {
  switch (action.type) {
    case INVALIDATE_THEATERS:
    case RECEIVE_MOVIES:
    case REQUEST_MOVIES:
      return Object.assign({}, state, {
        [action.theaters]: movies(state[action.theaters], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  moviesByTheaters,
  selectedTheaters
})

export default rootReducer