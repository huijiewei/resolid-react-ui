import { visit } from "unist-util-visit";

export default function () {
  return async (root) => {
    visit(root, "mdxJsxFlowElement", (node) => {
      if (node.name === "details") {
        node.name = "Details";
      }
    });
  };
}
