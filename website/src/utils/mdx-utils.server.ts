import GithubSlugger from "github-slugger";
import { fromMarkdown } from "mdast-util-from-markdown";
import { toString } from "mdast-util-to-string";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cwd } from "node:process";
import { visit } from "unist-util-visit";
import { parse } from "yaml";

const MATTER_RE = /^---(?:\r?\n|\r)(?:([\s\S]*?)(?:\r?\n|\r))?---(?:\r?\n|\r|$)/;

export const getMdxMeta = async (file: string) => {
  const filePath = join(cwd(), file);

  const doc = await readFile(filePath, { encoding: "utf-8" });

  const match = doc.match(MATTER_RE);
  const matter = match == null ? null : match[1];
  const meta: { title?: string; description?: string } = matter == null ? {} : (parse(matter) ?? {});

  const tree = fromMarkdown(match == null ? doc : doc.slice(match[0].length).trim());
  const slugs = new GithubSlugger();

  const toc: { depth: number; text: string; slug: string }[] = [];

  visit(tree, ["heading"], (node) => {
    if (node.type == "heading") {
      const text = toString(node);

      toc.push({
        depth: node.depth,
        text: text,
        slug: slugs.slug(text),
      });
    }
  });

  return {
    meta,
    toc,
  };
};
