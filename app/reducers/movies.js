
import { combineReducers } from 'redux';
import {
  SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT,
  REQUEST_MOVIES, RECEIVE_MOVIES
} from '../actions';

const initialState = {
  isFetching: false,
  didInvalidate: false,
  movies: []
};

function selectedSubreddit(state = 'reactjs', action) {
  switch (action.type) {
  case SELECT_SUBREDDIT:
    return action.theaters
  default:
    return state
  }
}

function movies(state = initialState, action = {}) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
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

function postsBySubreddit(state = { }, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
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
  postsBySubreddit,
  selectedSubreddit
})

export default rootReducer