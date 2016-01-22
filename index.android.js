/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    marginBottom: 5,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  triler: {
    width: 50,
    height: 50,
  },
});

const API_KEY = '7waqfqbprs7pajbz28mqf6vz';
const API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
const PAGE_SIZE = 25;
const PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
const REQUEST_URL = API_URL + PARAMS;

console.log(REQUEST_URL);
class ReactNativeHW extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
        });
      })
      .done();
  }

  componentDidMount() {
      this.fetchData();
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  }

  renderMovie(movie) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
        <Image
          source={{uri: 'http://www.clipartbest.com/cliparts/9TR/Rby/9TRRby45c.png'}}
          style={styles.triler}
        />
      </View>
    );
  }

  render() {
    if(!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}
      />
    );
  }
}


AppRegistry.registerComponent('ReactNativeHW', () => ReactNativeHW);
