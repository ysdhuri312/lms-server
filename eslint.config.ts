/** @format */

import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig(
  [
    {
      files: ['**/*.ts}'],
      plugins: { js },
      extends: ['js/recommended'],
      languageOptions: {
        globals: { ...globals.browser, ...globals.node },
        parserOptions: {
          project: './tsconfig.json',
          sourceType: 'module',
          ecmaVersion: 'latest',
        },
      },
    },
    {
      rules: {
        'no-console': 'error',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
      },
    },
    tseslint.configs.recommended,
  ],
  [globalIgnores(['dist/**/*', 'node_modules/**'])],
);
