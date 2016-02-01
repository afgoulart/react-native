'use strict';

import React, { Component, ListView } from 'react-native';
import {bindActionCreators} from 'redux';
import ListMovies from '../components/listMovies';
import * as moviesActions from '../actions/movieActions';
import { connect } from 'react-redux';

// @connect(state => ({
//   state: state.counter
// }))
class MovieApp extends Component {
  constructor(props) {
    super(props);
  }

  
  render() {
    const { state, actions } = this.props;
    return (
      <ListMovies
        movies={state.movies}
        loaded={state.loaded}
        {...actions} />
    );
  }
}

export default connect(state => ({
    state: state.movie
  }),
  (dispatch) => ({
    actions: bindActionCreators(moviesActions, dispatch)
  })
)(MovieApp);
