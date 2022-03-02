const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  },
  injectGlobals: true,
  moduleDirectories: ['node_modules'],
  clearMocks: false,
  collectCoverage: false,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['./src/**/*.{ts}'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleDirectories: [
    'node_modules',
    compilerOptions.baseUrl.replace(/^\.\//, '').replace(/\/$/, '')
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths)
};
