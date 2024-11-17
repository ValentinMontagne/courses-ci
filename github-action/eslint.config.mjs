import importPlugin from 'eslint-plugin-import';
import nodePlugin from 'eslint-plugin-node';

export default [
  {
    languageOptions: {
      globals: {
        require: 'readonly',
        process: 'readonly',
        module: 'readonly',
      },
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    plugins: {
      import: importPlugin,
      node: nodePlugin,
    },
    rules: {
      // Définissez vos règles ici
    },
  },
];
