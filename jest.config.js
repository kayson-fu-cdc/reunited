process.env.TZ = 'UTC';

module.exports = {

  testPathIgnorePatterns: ['/node_modules/'],

  transformIgnorePatterns: [
  ],

  setupFiles: [
    './jest/jestSetup.js',
  ],

  testEnvironment: "jsdom"
};
