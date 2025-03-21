import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } }, // Bật môi trường Node.js
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "operator-linebreak": ["error", "before"], // Cho phép xuống dòng trước `? :`
      "quotes": ["error", "double"], // Ép dùng dấu " thay vì '
      "no-process-env": "off,", // Cho phép sử dụng process.env
      "no-unused-vars": "error",  // ❌ Báo lỗi nếu có biến không dùng
      "no-undef": "error",         // ❌ Báo lỗi nếu dùng biến chưa khai báo
      "no-unsafe-optional-chaining": "error",
      "no-console": "error"
    }
  }
];
