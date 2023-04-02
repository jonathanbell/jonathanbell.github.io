module.exports = {
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
    "^.+\\.jsx?$": "babel-jest",
		"^.+\\.(js|ts)$": "ts-jest",
  },
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
	preset: "ts-jest",
	testMatch: ["**/?(*.)+(test).ts?(x)"],
	transformIgnorePatterns: [
    // https://stackoverflow.com/a/65751672/1171790
    // "/node_modules/(?![@fontsource/libre-franklin|@foo/bar]).+\\.js$",
    // "/node_modules/(?![@fontsource/libre-franklin|@foo/bar]).+\\.ts$",
    // "/node_modules/(?![@fontsource/libre-franklin|@foo/bar]).+\\.tsx$",
    "/node_modules/(?![@fontsource/libre-franklin|@foo/bar]).+\\.css$",
	],
  moduleNameMapper: {
    // https://jestjs.io/docs/configuration#modulenamemapper-objectstring-string--arraystring
    '@fontsource/libre-franklin': '<rootDir>/src/test/stubs/styles.js',
  }
};
