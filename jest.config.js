module.exports = {
  testEnvironment: "node",
  moduleFileExtensions: ["js"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  testMatch: ["**/__tests__/**/*.+(js)", "**/?(*.)+(spec|test).+(js)"],
};
