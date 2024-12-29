import prettierConfig from "@resolid/config/prettier";

/**
 * @type {import("prettier").Config}
 */
const config = {
  ...prettierConfig,
  plugins: [...prettierConfig.plugins, "prettier-plugin-tailwindcss"],
};

// noinspection JSUnusedGlobalSymbols
export default config;
