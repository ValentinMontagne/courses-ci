import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    ignores: ["**/*.test.js"],
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" },
  },
  { languageOptions: { globals: { ...globals.node, jest: true } } },  // Ajout direct de globals.jest
  pluginJs.configs.recommended,
  {
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "no-console": "error",
    },
  },
];
