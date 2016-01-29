'use strict';

import React, { Component } from 'react-native';
import {bindActionCreators} from 'redux';
import ListMovies from '../components/listMovies';
import * as movieActions from '../actions/movieActions';
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
        state={state}
        {...actions} />
    );
  }
}

export default connect(state => ({
    state: state
  }),
  (dispatch) => ({
    actions: bindActionCreators(movieActions, dispatch)
  })
)(MovieApp);
