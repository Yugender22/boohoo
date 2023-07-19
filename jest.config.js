module.exports = {
  verbose: false,
  silent: false,
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  setupFiles: ['./jestSetupFile.js'],
  testRegex: '/__tests__/.+\\.test\\.(js|jsx|tsx?)$',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  coverageDirectory: 'reports/coverage',
  collectCoverage: true,
  testResultsProcessor: 'jest-sonar-reporter',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/ios/',
    '/android/',
    '/src/Assets',
    '/src/Constants',
    '/src/Translation',
  ],
  transformIgnorePatterns: [
    '/node_modules/(?!(@react-native-community|@react-native|react-native|react-navigation|@react-navigation' +
      'react-native-fast-image|react-native-elements|react-native-screens|react-native-vector-icons))',
  ],
  moduleNameMapper: {
    // '^.+\\.svg$': 'jest-svg-transformer',
  },
  coverageReporters: ['json', 'lcov'],
  coverageThreshold: {
    global: {
      statements: 70,
      lines: 70,
      functions: 70,
      branches: 60,
    },
  },
};
