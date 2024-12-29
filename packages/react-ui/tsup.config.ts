import { defineConfig } from "tsup";
import { reactCompilerEsbuildPlugin } from "./plugins/react-compiler-plugin";

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  target: "es2022",
  esbuildPlugins: [reactCompilerEsbuildPlugin({ filter: /\.[jt]sx?$/ })],
  dts: true,
  treeshake: true,
  clean: true,
});
