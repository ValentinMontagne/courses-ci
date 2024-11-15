import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    ignores: ["node_modules/**", "**/*.test.js"],
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" },
  },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  {
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "no-console": "warn", // Avertissement pour console.log
      "constructor-super": "off", // Désactive cette règle si elle pose problème
    },
  },
];
