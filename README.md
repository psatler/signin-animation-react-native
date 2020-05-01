<p align="center">
  <img alt="Repository Last Commit Date" src="https://img.shields.io/github/last-commit/psatler/meetapp-mobile?color=blue">

  <a href="https://www.linkedin.com/in/pablosatler/">
    <img alt="Made by Pablo Satler" src="https://img.shields.io/badge/made%20by-Pablo%20Satler-blue">
  </a>

  <!-- <img alt="License" src="https://img.shields.io/github/license/psatler/meetapp-frontend?color=blue"> -->

</p>

# Animations with Reanimated and Gesture Handler


The animation was created with React Native and was inspired in [this one](https://www.uplabs.com/posts/music-app-f97dc678-7b2d-4534-92ac-7dd0dd62944b).



#### How to run

```
expo init <project-name>
cd <project-name>


expo install expo-asset  (to cache, so we first load the image and then display the app)

expo install react-native-reanimated
expo install react-native-gesture-handler

yarn add react-native-svg - used for clipping the image
```

#### The animation in a gif

Recorded at a Xiomi Mi A3.

![loginanimation](/screenshots-and-gifs/login-animation.gif)

#### Some references 

- Preloading assets [with expo](https://docs.expo.io/guides/preloading-and-caching-assets/#pre-loading-and-caching-assets)
- [Gesture Handler](https://docs.expo.io/versions/latest/sdk/gesture-handler/)
- [Reanimated](https://docs.expo.io/versions/latest/sdk/reanimated/)