import React, { Component } from 'react';

import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';

// import { Container } from './styles';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default class pages extends Component {
  render() {
    return <View style={styles.container} >
      <View style={{ ...StyleSheet.absoluteFill }} >
        <Image
          source={require('../../assets/bg.jpg')}
          style={styles.imageStyle}
        />
      </View>

    {/* for the buttons, 1/3 of the screen height */}
      <View style={styles.buttonView} >
        <View style={styles.button} >
          <Text style={styles.buttonText} >SIGN IN</Text>
        </View>
        <View style={{...styles.button, backgroundColor: '#2e71dc'}} >
          <Text style={{...styles.buttonText, color: 'white'}} >SIGN IN WITH FACEBOOK</Text>
        </View>
      </View>
    </View>;
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-end'
    // alignItems: 'center',
  },

  imageStyle: {
    flex: 1,
    height: null,
    width: null,
  },

  buttonView: {
    height: windowHeight / 3,
    justifyContent: 'center'
  },
  button: {
    backgroundColor: 'white',
    height: 70,
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',

  }
})