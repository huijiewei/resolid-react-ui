import GithubSlugger from "github-slugger";
import { fromMarkdown } from "mdast-util-from-markdown";
import { frontmatterFromMarkdown } from "mdast-util-frontmatter";
import { toString } from "mdast-util-to-string";
import { frontmatter } from "micromark-extension-frontmatter";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cwd } from "node:process";
import { visit } from "unist-util-visit";
import { parse } from "yaml";

export const getMdxMeta = async (file: string) => {
  const filePath = join(cwd(), file);

  const doc = await readFile(filePath);
  const tree = fromMarkdown(doc, {
    extensions: [frontmatter()],
    mdastExtensions: [frontmatterFromMarkdown()],
  });
  const slugs = new GithubSlugger();

  const yaml: string[] = [];
  const toc: { depth: number; text: string; slug: string }[] = [];

  visit(tree, ["yaml", "heading"], (node) => {
    if (node.type == "yaml") {
      yaml.push(toString(node));
    }

    if (node.type == "heading") {
      const text = toString(node);

      toc.push({
        depth: node.depth,
        text: text,
        slug: slugs.slug(text),
      });
    }
  });

  const meta = yaml.reduce((result, str) => {
    return { ...result, ...parse(str.replace(/\\n/g, "\n")) };
  }, {}) as { title: string; description: string };

  return {
    meta,
    toc,
  };
};
