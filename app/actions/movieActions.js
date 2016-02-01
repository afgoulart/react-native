import * as types from './actionTypes';

export function increment() {
  return {
    type: types.INCREMENT
  };
}

export function decrement() {
  return {
    type: types.DECREMENT
  };
}

export function request_movies() {
  return {
    type: types.REQUEST_MOVIES
  }
}
export function recive_movies() {
  return {
    type: types.RECIVE_MOVIES
  }
}

export function details() {
  return {
    type: types.SELECT_THEATERS
  };
}
