module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier',
    'plugin:tailwindcss/recommended',
  ],
  overrides: [],
  parser: '@javascript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  ignorePatterns: ['.eslintrc.js', 'tailwind.config.js'],
  rules: {
    'react/prop-types': 'off',
  },
};
