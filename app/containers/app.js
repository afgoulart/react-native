import React, { Component } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from '../reducers';
// import CounterApp from './counterApp';
import MovieApp from './movieApp';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

export default class App extends Component {
  componentDidMount() {
    store.dispatch({ type: 'REQUEST_MOVIES'});
  }
  render() {
    return (
      <Provider store={store} >
        <MovieApp />
      </Provider>
    );
  }
}
