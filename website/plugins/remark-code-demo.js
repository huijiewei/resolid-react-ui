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

    const demoMdx = [];

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

      const demoId = `_${pageName}_${demoIndex++}`;
      const demoName = `Demo${demoId}`;
      const virtualModulePath = join(virtualDir, `${demoId}.tsx`);

      demoMdx.push({
        type: "mdxjsEsm",
        value: `import ${demoName} from ${JSON.stringify(virtualModulePath)}`,
        data: {
          estree: {
            type: "Program",
            sourceType: "module",
            body: [
              {
                type: "ImportDeclaration",
                specifiers: [
                  {
                    type: "ImportDefaultSpecifier",
                    local: { type: "Identifier", name: demoName },
                  },
                ],
                source: {
                  type: "Literal",
                  value: virtualModulePath,
                  raw: `${JSON.stringify(virtualModulePath)}`,
                },
              },
            ],
          },
        },
      });

      Object.assign(node, {
        type: "mdxJsxFlowElement",
        name: "ComponentDemo",
        children: [
          {
            ...node,
            hasVisited: true,
          },
          {
            type: "mdxJsxFlowElement",
            name: demoName,
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

    tree.children.unshift(...demoMdx);
  };
}
