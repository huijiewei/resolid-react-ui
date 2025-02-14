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
import { type AliasOptions, defineConfig, type UserConfig } from "vite";
import babel from "vite-plugin-babel";
import viteInspect from "vite-plugin-inspect";
import tsconfigPaths from "vite-tsconfig-paths";
import remarkCodeDemo from "./plugins/remark-code-demo";
import remarkDocgen from "./plugins/remark-docgen";
import remarkGithubAlert from "./plugins/remark-github-alert";
import remarkRemove from "./plugins/remark-remove";
import viteCopy from "./plugins/vite-copy";

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
              langs: ["bash", "js", "jsx", "ts", "tsx", "html", "css"],
              themes: {
                light: "github-light",
                dark: "github-dark",
              },
              defaultColor: false,
            },
          ],
        ],
        remarkPlugins: [
          remarkDirective,
          remarkFrontmatter,
          remarkGfm,
          remarkGithubAlert,
          remarkCodeDemo,
          [remarkDocgen, { sourceRoot: join(__dirname, "../packages/react-ui/src/components") }],
          remarkRemove,
        ],
      }),
      reactRouterHonoServer({
        entryFile: "server.node.ts",
        exclude: ["/.resolid/code-demos/*"],
      }),
      tailwindcss(),
      reactRouter(),
      babel({
        filter: /\.[jt]sx?$/,
        babelConfig: {
          compact: false,
          babelrc: false,
          configFile: false,
          presets: ["@babel/preset-typescript"],
          plugins: [
            [
              "babel-plugin-react-compiler",
              {
                target: "19",
              },
            ],
          ],
        },
        loader: (path) => {
          return extname(path).substring(1) as "js" | "jsx";
        },
      }),
      !isBuild && tsconfigPaths(),
      !isBuild && viteInspect(),
      isBuild &&
        isSsrBuild &&
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

                if (id.includes("src/components/history-link.tsx") || id.includes("src/components/sprite-icon.tsx")) {
                  return "components";
                }
              },
        },
      },
    },
    esbuild: { legalComments: "none" },
    resolve: {
      alias: [isBuild && { find: "~", replacement: join(__dirname, "./src") }].filter(Boolean) as AliasOptions,
    },
  };

  return config;
});
