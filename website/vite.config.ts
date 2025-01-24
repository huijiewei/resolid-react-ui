import mdx from "@mdx-js/rollup";
import { reactRouter } from "@react-router/dev/vite";
import { reactRouterHonoServer } from "@resolid/react-router-hono/dev";
import rehypeShiki from "@shikijs/rehype";
import tailwindcss from "@tailwindcss/vite";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig, type UserConfig } from "vite";
import babel from "vite-plugin-babel";
import viteInspect from "vite-plugin-inspect";
import tsconfigPaths from "vite-tsconfig-paths";
import remarkCodeDemo from "./plugins/remark-code-demo";
import remarkDocgen from "./plugins/remark-docgen";
import remarkGithubAlert from "./plugins/remark-github-alert";
import viteCopy from "./plugins/vite-copy";

const ReactCompilerConfig = {
  target: "19",
};

export default defineConfig(({ command, isSsrBuild }) => {
  const isBuild = command == "build";

  const __dirname = fileURLToPath(new URL(".", import.meta.url));

  const config: UserConfig = {
    plugins: [
      mdx({
        providerImportSource: "@mdx-js/react",
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeShiki,
            {
              themes: {
                light: "github-light",
                dark: "github-dark",
              },
            },
          ],
        ],
        remarkPlugins: [
          remarkDirective,
          remarkFrontmatter,
          remarkMdxFrontmatter,
          remarkGfm,
          remarkGithubAlert,
          remarkCodeDemo,
          [remarkDocgen, { sourceRoot: join(__dirname, "../packages/react-ui/src/components") }],
        ],
      }),
      reactRouterHonoServer({
        entryFile: "server.node.ts",
        exclude: ["/.resolid/component-demo/*"],
      }),
      tailwindcss(),
      reactRouter(),
      babel({
        filter: /\.[jt]sx?$/,
        babelConfig: {
          compact: false,
          presets: ["@babel/preset-typescript"],
          plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
        },
        loader: (path) => {
          return extname(path).substring(1) as "js" | "jsx";
        },
      }),
      tsconfigPaths(),
      !isBuild && viteInspect(),
      viteCopy({
        targets: ["src/routes/docs/_mdx/**/*.mdx"],
      }),
    ].filter(Boolean),
    build: {
      target: isSsrBuild ? "node22" : "modules",
      cssTarget: ["edge88", "firefox78", "chrome87", "safari14"],
      rollupOptions: {
        output: {
          hoistTransitiveImports: false,
          manualChunks: isSsrBuild
            ? undefined
            : (id) => {
                if (
                  id.includes("/node_modules/react/") ||
                  id.includes("/node_modules/react-dom/") ||
                  id.includes("/node_modules/react-is/") ||
                  id.includes("/node_modules/scheduler/")
                ) {
                  return "react";
                }

                if (
                  id.includes("/node_modules/@react-router/") ||
                  id.includes("/node_modules/react-router/") ||
                  id.includes("/node_modules/turbo-stream/") ||
                  id.includes("react-router/with-props") ||
                  id.includes("react-router-meta")
                ) {
                  return "react-router";
                }
              },
        },
      },
    },
    esbuild: { legalComments: "none" },
  };

  return config;
});
