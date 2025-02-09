import { transformAsync } from "@babel/core";
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
        cloneInputAst: false,
        plugins: [
          [
            "babel-plugin-react-compiler",
            {
              target: "19",
            },
          ],
          "annotate-pure-calls",
        ],
        parserOpts: {
          plugins: ["jsx", "typescript"],
        },
        ast: false,
        compact: false,
        sourceMaps: false,
        babelrc: false,
        configFile: false,
      });

      timings.push(performance.now() - t0);

      return { contents: result?.code ?? undefined, loader: "default" };
    });
  },
});
