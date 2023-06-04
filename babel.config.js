module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'react-native-reanimated/plugin', {
        relativeSourceLocation: true,
      },
    ]
  ],
};
//Make sure react-native-reanimated plugin is listed
//last in the plugins
