module.exports = {
  preset: "ts-jest/presets/js-with-ts",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/src/__mocks__/style.js",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/src/__mocks__/file.js"
  },
  globals: {
    "ts-jest": {
      // ts-jest configuration goes here
      tsConfig: "./tsconfig.test.json"
    }
  }
};
