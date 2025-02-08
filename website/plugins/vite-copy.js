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

  let config;
  let copied = false;

  return {
    name: "vite-plugin-copy",
    apply: "build",
    configResolved(_config) {
      config = _config;
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

          const resolvedSrc = resolve(config.root, relativeMatchedPath);
          const resolvedDest = resolve(config.root, config.build.outDir, relativeMatchedPath);

          await cp(resolvedSrc, resolvedDest, { recursive: true });
        }
      }

      copied = true;
    },
  };
}
