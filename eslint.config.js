'use strict';

const js = require('@eslint/js');
const globals = require('globals');

const commonRules = {
  'no-unused-vars': ['error', {
    argsIgnorePattern: '^_',
    varsIgnorePattern: '^_',
  }],
  'no-console': 'off',
  'no-empty': ['error', { allowEmptyCatch: true }],
  'prefer-const': 'error',
  'no-var': 'error',
  'eqeqeq': ['error', 'always', { null: 'ignore' }],
  'curly': ['error', 'multi-line'],
  'no-throw-literal': 'error',
  'no-eval': 'error',
  'no-implied-eval': 'error',
  'no-new-func': 'error',
  'no-redeclare': ['error', { builtinGlobals: false }],
};

module.exports = [
  js.configs.recommended,

  {
    ignores: ['node_modules/**', 'dist/**', 'coverage/**'],
  },

  {
    files: ['eslint.config.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: { ...globals.node },
    },
    rules: commonRules,
  },

  {
    files: ['src/js/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: {
        ...globals.browser,
        ...globals.webextensions,
        chrome: 'readonly',
        module: 'writable',
        require: 'readonly',
      },
    },
    rules: commonRules,
  },

  {
    files: ['scripts/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: { ...globals.node },
    },
    rules: commonRules,
  },

  {
    files: ['tests/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: { ...globals.node },
    },
    rules: commonRules,
  },
];
