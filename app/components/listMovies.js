import React, {
  Component, Image, ListView, Text, View, StyleSheet, 
  ScrollView, TouchableHighlight,
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
export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false
    };
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

  details(rowID){
    return (
      <View>

      </View>
    );
  }

  renderMovie(rowData, sectionID, rowID) {
    console.log('rowData',rowData);
    console.log('sectionID',sectionID);
    console.log('rowID',rowID);
    return (
       <TouchableHighlight onPress={() => this.details(rowID)}>
        <View>
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
              onClick={details}
            />
          </View>
        </View>
      </TouchableHighlight>
      
    );
  }

  componentWillMount() {
    console.log('w',this.props);
    const { request_movies } = this.props;
    request_movies();
  }
  componentWillUpdate(nextProps, nextState) {
    console.log('wu',nextProps, nextState);
  }

  render() {
    console.log()
    const { movies, loaded, details, increment, decrement, request_movies } = this.props;
    if(!loaded) {
      return this.renderLoadingView();
    }

    this.setState({
      movies: this.state.movies.cloneWithRows(movies),
      loaded: true,
    });
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.movies}
          renderRow={this.renderMovie}
          renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
          style={styles.listView}
        />
      </View>
    );
  }
}
