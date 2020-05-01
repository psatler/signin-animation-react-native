import React, { Component } from 'react';

import { Text, View, StyleSheet, Image, Dimensions, TextInput } from 'react-native';

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
  Extrapolate,
  concat, // to pass the deg for rotating the cross
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
    duration: 550, // in ms
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
              set(this.buttonOpacity, // set opacity with the help of runTiming function
                runTiming(new Clock(), 1, 0))
                )
              ])
      }
    ]);

    this.onCloseState = event([
      {
        nativeEvent: ({state}) =>
          // detect when the end of the click on the close button occurs, so we change the button opacity reversely
          block([
            cond(
              eq(state, State.END), 
              set(this.buttonOpacity, 
                runTiming(new Clock(), 0, 1)) // now from zero to one
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

    // for the text input the shows up after the animation ends
    this.textInputZIndex = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, -1],
      extrapolate: Extrapolate.CLAMP,
    });
    this.textInputY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0, 100],
      extrapolate: Extrapolate.CLAMP,
    });
    this.textInputOpacity = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    // rotating the X cross of the close button
    this.rotateCross = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [180, 360], // we can't pass degrees here with reanimated, so we'll the method 'concat'
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
        
        {/* Below are the elements shown when the buttons fade out */}
        <Animated.View 
          style={{
            zIndex: this.textInputZIndex,
            opacity: this.textInputOpacity,
            transform: [
              {
                translateY: this.textInputY,
              }
            ],
            height: windowHeight / 3,
            ...StyleSheet.absoluteFill,
            top: null,
            justifyContent: 'center'
          }}
        >
          <TapGestureHandler onHandlerStateChange={this.onCloseState} >
            <Animated.View
              style={styles.closeButton}
            >
              <Animated.Text
                style={{ 
                  fontSize: 15,
                  transform: [
                    {
                      rotate: concat(this.rotateCross, 'deg')
                    }
                  ]
                }}
              >
                X
              </Animated.Text>
            </Animated.View>
          </TapGestureHandler>

          <TextInput
            placeholder="email"
            style={styles.textInput}
            placeholderTextColor="black"
          />
          <TextInput
            placeholder="password"
            style={styles.textInput}
            placeholderTextColor="black"
          />

          <Animated.View 
            style={styles.button}
          >
            <Text style={styles.buttonText} >
              SIGN IN
            </Text>
          </Animated.View>

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
    justifyContent: 'center',

    shadowOffset: { width: 2, height: 2},
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: 'rgba(0, 0, 0, 0.2)'
  },

  closeButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',

    position: 'absolute',
    top: -20,
    left: (windowWidth / 2) - 20,
    shadowOffset: { width: 2, height: 2},
    shadowColor: 'black',
    shadowOpacity: 0.2,
    // borderWidth: 1,
    // borderColor: 'black'
  }
})