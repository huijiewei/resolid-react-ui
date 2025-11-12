import eslintBrowser from "@resolid/config/eslint.browser";
import eslintReact from "@resolid/config/eslint.react";
import eslintTypescript from "@resolid/config/eslint.typescript";
import reactYouMightNotNeedAnEffect from "eslint-plugin-react-you-might-not-need-an-effect";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...eslintTypescript,
  ...eslintReact,
  ...eslintBrowser,
  reactYouMightNotNeedAnEffect.configs.recommended,
];
