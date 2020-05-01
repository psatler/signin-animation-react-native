import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { Asset } from 'expo-asset'
import { AppLoading } from 'expo'

import { cacheImages } from './src/utils/cacheImages'

import SignIn from './src/pages/SignIn'

class App extends React.Component {

  state = {
    isReady: false,
  }
  

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('./assets/bg.jpg'),
    ]);

    await Promise.all([...imageAssets]);
  }

  render() {

    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }


    return (
      <SignIn />
    )
  }
}

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.tsx to start working on your app!</Text>
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default App;