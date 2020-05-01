import { Image } from 'react-native';

import { Asset } from 'expo-asset'

// https://docs.expo.io/guides/preloading-and-caching-assets/#pre-loading-and-caching-assets
function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export { cacheImages }