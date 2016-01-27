import * as types from './actionTypes';


const API_KEY = '7waqfqbprs7pajbz28mqf6vz';
const API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
const PAGE_SIZE = 25;
const PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
const REQUEST_URL = API_URL + PARAMS;

function requestPosts(theaters) {
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




export function listMovies() {
  return {
    type: types.SHOW_ALL_LIST
  };
}

export function selectSubreddit(theaters) {
  return {
    type: SELECT_SUBREDDIT,
    theaters
  }
}

export function invalidateSubreddit(theaters) {
  return {
    type: INVALIDATE_THEATERS,
    theaters
  }
}

function requestPosts(theaters) {
  return {
    type: REQUEST_POSTS,
    theaters
  }
}

function receivePosts(theaters, json) {
  return {
    type: RECEIVE_POSTS,
    theaters,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function fetchPosts(theaters) {
  return dispatch => {
    dispatch(requestPosts(theaters))
    return fetch(`http://www.reddit.com/r/${theaters}.json`)
      .then(req => req.json())
      .then(json => dispatch(receivePosts(theaters, json)))
  }
}

function shouldFetchPosts(state, theaters) {
  const posts = state.postsBySubreddit[theaters]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded(theaters) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), theaters)) {
      return dispatch(fetchPosts(theaters))
    }
  }
}