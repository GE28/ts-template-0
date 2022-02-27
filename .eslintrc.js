module.exports = {
  env: {
    es2021: true,
    node: true
  },
  plugins: ['prettier', 'import'],
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true
      }
    }
  },
  ignorePatterns: ['out/**/*.js', 'lib/**/*.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-console': 'off',
    'no-param-reassign': 'off',
    'arrow-parens': ['error', 'always']
  }
};
