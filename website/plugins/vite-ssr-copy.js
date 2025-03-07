import fg from "fast-glob";
import { cp } from "node:fs/promises";
import { isAbsolute, relative, resolve } from "node:path";
import { cwd } from "node:process";

/**
 * @param {{targets: string[]}} options
 * @return {import("vite").Plugin<{targets: string[]}>}
 */
export default function (options) {
  const root = cwd();

  let copied = false;
  let rootDir;
  let outputDir;

  return {
    name: "vite-plugin-copy",
    apply: "build",
    configResolved(config) {
      rootDir = config.root;
    },
    applyToEnvironment(environment) {
      if (environment.name !== "ssr") {
        return false;
      }

      outputDir = environment.config.build.outDir;

      return true;
    },
    async writeBundle() {
      if (copied) {
        return;
      }

      for (const target of options.targets) {
        const matchedPaths = await fg(target, {
          cwd: root,
          onlyFiles: false,
        });

        for (const matchedPath of matchedPaths) {
          const relativeMatchedPath = isAbsolute(matchedPath) ? relative(root, matchedPath) : matchedPath;

          const resolvedSrc = resolve(rootDir, relativeMatchedPath);
          const resolvedDest = resolve(rootDir, outputDir, relativeMatchedPath);

          await cp(resolvedSrc, resolvedDest, { recursive: true });
        }
      }

      copied = true;
    },
  };
}
