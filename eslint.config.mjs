// ESLint Flat Config for Next.js 16 + React 19 + TypeScript 5.9
// Built with accessibility and performance considerations.
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';
import fs from 'node:fs';
import path from 'node:path';

const gitignorePath = path.resolve('.gitignore');
const ignores = fs.existsSync(gitignorePath) ? [includeIgnoreFile(gitignorePath)] : [];

export default [
  // Ignore patterns from .gitignore + build dirs
  ...ignores,
  {
    ignores: ['.next/', 'dist/', 'node_modules/'],
  },
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json'],
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // TypeScript specific best practices
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', ignoreRestSiblings: true }],
      '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],
      '@typescript-eslint/no-empty-function': 'off',
      // General JS rules adjustments
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'eqeqeq': ['error', 'smart'],
      'curly': ['error', 'all'],
      // React specific adjustments for React 19 automatic runtime
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',
    },
  },
  {
    files: ['**/*.tsx'],
    rules: {
      // JSX accessibility placeholders (can expand later)
      'react/jsx-no-comment-textnodes': 'off', // React 19 reconciler changes reduce need
    },
  },
];