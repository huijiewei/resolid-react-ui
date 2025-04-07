import type { Config } from "@react-router/dev/config";
import { nodePreset } from "@resolid/react-router-hono/node-preset";
import { vercelPreset } from "@resolid/react-router-hono/vercel-preset";
import { env } from "node:process";

// noinspection JSUnusedGlobalSymbols
export default {
  appDirectory: "src",
  ssr: true,
  presets: [
    env.VERCEL == "1"
      ? vercelPreset({
          regions: ["sin1"],
          entryFile: "server.vercel.ts",
          nodeVersion: 22,
        })
      : nodePreset({
          entryFile: "server.node.ts",
          nodeVersion: 22,
        }),
  ],
  future: {
    unstable_optimizeDeps: true,
    unstable_subResourceIntegrity: true,
    unstable_splitRouteModules: true,
    unstable_viteEnvironmentApi: true,
  },
} satisfies Config;
