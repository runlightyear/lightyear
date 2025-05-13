import type { Linter } from "eslint";
import parser from "@typescript-eslint/parser";
import plugin from "@typescript-eslint/eslint-plugin";

const config: Linter.Config = {
  files: ["**/*.{ts,tsx}"],
  languageOptions: {
    parser,
    parserOptions: { sourceType: "module" },
  },
  plugins: {
    "@typescript-eslint": plugin as any,
  },
  rules: {
    "turbo/no-undeclared-env-vars": "off",
    "react/jsx-key": "off",
  },
};

export default config;
