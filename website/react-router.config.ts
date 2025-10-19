import type { Config } from "@react-router/dev/config";
import { nodePreset } from "@resolid/react-router-hono/node-preset";
import { vercelPreset } from "@resolid/react-router-hono/vercel-preset";
import { env } from "node:process";

const includeFiles = ["src/routes/docs/_mdx/**/*.mdx"];

// noinspection JSUnusedGlobalSymbols
export default {
  appDirectory: "src",
  ssr: true,
  presets: [
    env.VERCEL == "1"
      ? vercelPreset({
          entryFile: "server.vercel.ts",
          includeFiles,
          nodeVersion: 22,
        })
      : nodePreset({
          entryFile: "server.node.ts",
          includeFiles,
          nodeVersion: 22,
        }),
  ],
  future: {
    unstable_optimizeDeps: true,
    unstable_splitRouteModules: true,
    unstable_viteEnvironmentApi: true,
  },
} satisfies Config;
