import { defineConfig, type ViteUserConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
  },
}) as ViteUserConfig;
