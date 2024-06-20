import js from '@eslint/js';
import react from 'eslint-plugin-react';
import babelParser from '@babel/eslint-parser';
import globals from 'globals';

export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    ignores: ['node_modules/**', 'build/**'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        requireConfigFile: false,
      },
      globals: globals.browser,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  js.configs.recommended,
  {
    plugins: {
      react,
    },
    rules: {
      'no-unused-vars': 'off',
    },
  },
];
