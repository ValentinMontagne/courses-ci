// eslint.config.mjs
import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    ignores: ["**/*.test.js"], // Ignorer les fichiers de test
    files: ["**/*.js"], // Cibler tous les fichiers JavaScript
    languageOptions: { sourceType: "commonjs" },
  },
  { languageOptions: { globals: globals.node } }, // Définir les globales pour Node.js
  pluginJs.configs.recommended, // Utiliser les règles recommandées par ESLint
  {
    rules: {
      "no-unused-vars": "error", // Ne pas autoriser les variables inutilisées
      "no-undef": "error", // Ne pas autoriser les variables non définies
      "no-console": "error", // Ne pas autoriser les console.log dans le code
    },
  },
];
