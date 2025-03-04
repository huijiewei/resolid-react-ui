import eslintBrowser from "@resolid/config/eslint.browser";
import eslintReact from "@resolid/config/eslint.react";
import eslintTypescript from "@resolid/config/eslint.typescript";

/** @type {import("eslint").Linter.Config[]} */
export default [...eslintTypescript, ...eslintReact, ...eslintBrowser];
