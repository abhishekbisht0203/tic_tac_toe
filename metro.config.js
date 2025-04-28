const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');
const defaultConfig = getDefaultConfig(__dirname);
const config = {};

module.exports = withNativeWind(mergeConfig(defaultConfig, config), {
  input: './global.css',
});