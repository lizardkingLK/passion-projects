import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.ts"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  globalIgnores(["dist"])
];