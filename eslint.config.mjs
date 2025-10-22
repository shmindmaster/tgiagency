// ESLint Flat Config for Next.js 16 + React 19 + TypeScript 5.9
// Built with accessibility and performance considerations.
import js from '@eslint/js';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import { includeIgnoreFile } from '@eslint/compat';
import path from 'node:path';
import fs from 'node:fs';

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