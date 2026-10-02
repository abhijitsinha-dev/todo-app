import js from '@eslint/js';
import globals from 'globals';

const sharedRules = {
  'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  'no-console': 'off',
  'prefer-const': 'warn',
  'no-var': 'error',
  eqeqeq: ['warn', 'always']
};

export default [
  {
    ignores: ['dist/**', 'node_modules/**', '.eslintcache']
  },
  js.configs.recommended,
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2025
      }
    },
    rules: sharedRules
  },
  {
    files: ['*.js', 'scripts/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2025
      }
    },
    rules: sharedRules
  }
];
