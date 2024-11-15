import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'airbnb'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'import'],
  rules: {
    // Règles de configuration personnalisées
    'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.tsx'] }],
    'import/prefer-default-export': 'off',
    'no-console': 'warn',
    'no-unused-vars': 'warn'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
});
