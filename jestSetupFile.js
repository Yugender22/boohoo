import React from 'react';


// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');


jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    }),
    useRoute: () => ({
      params: {},
    }),
    useIsFocused: () => ({
      isFocused: true,
    }),
    useNavigationState: state => state,
  };
});

jest.mock(
  'react-native//Libraries/PermissionsAndroid/PermissionsAndroid',
  () => {
    const PermissionsAndroid = jest.requireActual(
      'react-native//Libraries/PermissionsAndroid/PermissionsAndroid',
    );
    return {
      ...PermissionsAndroid,
      check: jest.fn(() => Promise.resolve(true)),
      request: jest.fn(() => Promise.resolve(true)),
    };
  },
);


jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

// global.__reanimatedWorkletInit = jest.fn();


jest.mock('react-native-safe-area-context', () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };
  const frame = { width: 390, height: 844, x: 0, y: 0 };
  return {
    SafeAreaProvider: jest.fn().mockImplementation(({ children }) => children),
    SafeAreaConsumer: jest
      .fn()
      .mockImplementation(({ children }) => children(inset)),
    SafeAreaView: jest.fn().mockImplementation(({ children }) => children),
    useSafeAreaInsets: jest.fn().mockImplementation(() => inset),
    useSafeAreaFrame: jest.fn().mockImplementation(() => frame),
  };
});


jest.mock('react-native/Libraries/Utilities/Platform', () => {
  const platform = {
    OS: 'ios',
  };

  const select = jest.fn().mockImplementation(obj => {
    const value = obj[platform.OS];
    return !value ? obj.default : value;
  });

  platform.select = select;

  return platform;
});
