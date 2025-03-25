import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "module" } }, // ✅ Sửa CommonJS thành ES Modules
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  {
    rules: {
      "operator-linebreak": ["error", "before"],
      "quotes": ["error", "double"],
      "no-process-env": "off",
      "no-unused-vars": "error",
      "no-undef": "error",
      "no-unsafe-optional-chaining": "error",
      "no-console": "error"
    }
  }
];
