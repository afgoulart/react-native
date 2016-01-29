import React, {
  AppRegistry, Component, Image, ListView, Text, View, StyleSheet,
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
    marginTop: 10,
    marginBottom: 10,
    width: 40,
    height: 40,
  },
});

class ListMovies extends Component {
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
    const {loaded, dataSource} = this.state;
    if(!loaded) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.container}>
        <ListView
          dataSource={dataSource}
          renderRow={this.renderMovie}
          style={styles.listView}
        />
      </View>
    );
  }
}

export default ListMovies;