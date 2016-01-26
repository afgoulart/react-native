/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  DrawerLayoutAndroid, 
  ProgressBarAndroid,
  StyleSheet,
  Text,
} from 'react-native';
import ListMovies from './components/ListMovies';

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
    width: 30,
    height: 30,
  },
});

class ReactNativeHW extends Component {
  render() {
    return (
      <DrawerLayoutAndroid renderNavigationView={() => <Text>Teste</Text>}>
        <ListMovies />
      </DrawerLayoutAndroid>
    );
  }
}


AppRegistry.registerComponent('ReactNativeHW', () => ReactNativeHW);
