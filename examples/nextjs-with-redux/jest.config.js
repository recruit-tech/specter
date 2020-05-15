const TEST_REGEX = '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$'

// See: https://itnext.io/how-to-make-your-sluggish-jest-v23-tests-go-faster-1d4f3388bcdd

module.exports = {
  setupFiles: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'node',
  testRegex: TEST_REGEX,
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
    '^.+\\.jsx?$': 'babel-jest'
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', '<rootDir>/dist/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/__mocks__/js-cookie.ts'],
  collectCoverage: false
}
