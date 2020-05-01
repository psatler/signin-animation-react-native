import React, { Component } from 'react';

import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';

// import { Container } from './styles';
import Animated, { Easing } from 'react-native-reanimated'
import { TapGestureHandler, State } from 'react-native-gesture-handler'

const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate
} = Animated;

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')


function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease)
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position
  ]);
}

export default class pages extends Component {

  constructor() {
    super();

    this.buttonOpacity = new Value(1);
    this.onStateChange = event([
      {
        nativeEvent: ({state}) =>
          // if state is END, then we set the opacity to zero using the runTiming function
          block([
            cond(
              eq(state, State.END), 
              set(this.buttonOpacity, 
                runTiming(new Clock(), 1, 0))
                )
              ])
      }
    ]);

    // the button goes down by 100
    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    // push the background upwards
    this.bgY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-windowHeight / 3, 0],
      extrapolate: Extrapolate.CLAMP,
    });
  }

  render() {
    return (
    <View style={styles.container} >
      {/* background view */}
      <Animated.View style={{ 
        ...StyleSheet.absoluteFill,
        transform:  [
          {
            translateY: this.bgY,
          }
        ]
        
        }} >
        <Image
          source={require('../../assets/bg.jpg')}
          style={styles.imageStyle}
        />
      </Animated.View>

    {/* for the buttons, 1/3 of the screen height */}
      <View style={styles.buttonView} >
        <TapGestureHandler onHandlerStateChange={this.onStateChange} >
          <Animated.View style={{
            ...styles.button, 
            opacity: this.buttonOpacity,
            transform: [
              {
                translateY: this.buttonY
              }
            ]
            }} >
            <Text style={styles.buttonText} >SIGN IN</Text>
          </Animated.View>
        </TapGestureHandler>
        <Animated.View style={{
          ...styles.button,
          backgroundColor: '#2e71dc',
          opacity: this.buttonOpacity,
            transform: [
              {
                translateY: this.buttonY
              }
            ]
          }} >
          <Text style={{...styles.buttonText, color: 'white'}} >SIGN IN WITH FACEBOOK</Text>
        </Animated.View>
      </View>
    </View>
    );
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