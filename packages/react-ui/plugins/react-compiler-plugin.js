import { transformAsync } from "@babel/core";
import BabelPluginReactCompiler from "babel-plugin-react-compiler";
import { readFile } from "node:fs/promises";

// noinspection JSUnusedGlobalSymbols
/** @returns {import("esbuild").Plugin} */
export const reactCompilerEsbuildPlugin = ({ filter }) => ({
  name: "esbuild-react-compiler-plugin",
  setup(build) {
    let timings = [];

    build.onEnd(() => {
      if (timings.length < 1) return;

      const totalTime = timings.reduce((sum, x) => sum + x, 0).toFixed(0);
      console.log(`[⚛️  React Compiler] ${timings.length} files changed`);
      console.log(`[⚛️  React Compiler] Used ${totalTime} ms`);

      timings = [];
    });

    build.onLoad({ filter }, async (args) => {
      const contents = await readFile(args.path, "utf8");

      const t0 = performance.now();

      const result = await transformAsync(contents, {
        filename: args.path,
        plugins: [[BabelPluginReactCompiler]],
        parserOpts: {
          plugins: ["jsx", "typescript"],
        },
        ast: false,
        sourceMaps: false,
        configFile: false,
        babelrc: false,
      });

      timings.push(performance.now() - t0);

      return { contents: result?.code ?? undefined, loader: "default" };
    });
  },
});
