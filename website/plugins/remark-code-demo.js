import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";
import { visit } from "unist-util-visit";

export default function () {
  const virtualDir = join(cwd(), ".resolid", "component-demo");

  mkdirSync(virtualDir, { recursive: true });

  return (tree, vfile) => {
    const pageName = vfile.basename.replace(vfile.extname, "");

    let demoIndex = 1;

    visit(tree, "code", (node) => {
      if ("hasVisited" in node) {
        return;
      }

      if (!node.meta?.includes("demo")) {
        return;
      }

      const code = node.value;

      if (!code) {
        return;
      }

      const id = `_${pageName}_${demoIndex++}`;
      const virtualModulePath = join(virtualDir, `${id}.tsx`);

      Object.assign(node, {
        type: "mdxJsxFlowElement",
        name: "ComponentDemo",
        attributes: [
          {
            type: "mdxJsxAttribute",
            name: "demoId",
            value: id,
          },
        ],
        children: [
          {
            ...node,
            hasVisited: true,
          },
        ],
      });

      if (existsSync(virtualModulePath)) {
        const content = readFileSync(virtualModulePath, "utf-8");

        if (content === code) {
          return;
        }
      }

      writeFileSync(virtualModulePath, code);
    });
  };
}
