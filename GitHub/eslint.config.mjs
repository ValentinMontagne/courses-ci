import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.browser,  // Include browser globals
        process: "readonly"   // Add process as a read-only global
      }
    }
  },
  {
    languageOptions: {
      globals: globals.browser // Keep browser globals
    }
  },
  pluginJs.configs.recommended,
];
