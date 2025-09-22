import { defineConfig, type UserConfig } from "tsdown";

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  entry: "src/index.ts",
  format: "esm",
  platform: "browser",
  target: "es2022",
  dts: true,
  treeshake: true,
  clean: true,
}) as UserConfig;
