import { fromJs } from "esast-util-from-js";
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, parse } from "node:path";
import { cwd } from "node:process";
import { withCustomConfig } from "react-docgen-typescript";
import { visit } from "unist-util-visit";

const propsTables = {};
const kebabCaseRegex = /[a-zA-Z0-9]+/g;

export default function ({ sourceRoot }) {
  if (!sourceRoot) {
    throw new Error("Please set sourceRoot.");
  }

  const virtualDir = join(cwd(), ".resolid", "component-props");

  mkdirSync(virtualDir, { recursive: true });

  return (tree) => {
    visit(
      tree,
      [
        { type: "leafDirective", name: "PropsTable" },
        { type: "containerDirective", name: "UsageBlock" },
      ],
      (node, index, parent) => {
        const componentFile = node.attributes["file"];

        if (!componentFile) {
          throw new Error(`Invalid componentFile prop for ${node.name}.`);
        }

        const componentName = (parse(componentFile).name.match(kebabCaseRegex) || [])
          .map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`)
          .join("");

        if (!propsTables[componentName]) {
          const componentProps = getComponentProps(virtualDir, join(sourceRoot, componentFile), componentName);

          if (componentProps) {
            propsTables[componentName] = componentProps;
          }
        }

        if (propsTables[componentName]) {
          const propsJSON = JSON.stringify(propsTables[componentName]);

          if (parent === undefined || index === undefined) {
            return;
          }

          if (node.name === "UsageBlock") {
            const ignoresJson = JSON.stringify(node.attributes["ignores"]?.split(",") ?? []);

            parent.children[index] = {
              type: "mdxJsxFlowElement",
              name: "UsageBlock",
              attributes: [
                {
                  type: "mdxJsxAttribute",
                  name: "props",
                  value: {
                    type: "mdxJsxAttributeValueExpression",
                    value: `(${propsJSON})`,
                    data: {
                      estree: fromJs(`(${propsJSON})`, {
                        module: true,
                      }),
                    },
                  },
                },
                {
                  type: "mdxJsxAttribute",
                  name: "ignores",
                  value: {
                    type: "mdxJsxAttributeValueExpression",
                    value: `(${ignoresJson})`,
                    data: {
                      estree: fromJs(`(${ignoresJson})`, {
                        module: true,
                      }),
                    },
                  },
                },
              ],
              children: [
                ...node.children,
                {
                  type: "mdxFlowExpression",
                  value: "(props) => <Usage {...props} />",
                  data: {
                    estree: {
                      type: "Program",
                      body: [
                        {
                          type: "ExpressionStatement",
                          expression: {
                            type: "ArrowFunctionExpression",
                            id: null,
                            expression: true,
                            generator: false,
                            async: false,
                            params: [
                              {
                                type: "Identifier",
                                name: "props",
                              },
                            ],
                            body: {
                              type: "JSXElement",
                              openingElement: {
                                type: "JSXOpeningElement",
                                attributes: [
                                  {
                                    type: "JSXSpreadAttribute",
                                    argument: {
                                      type: "Identifier",
                                      name: "props",
                                    },
                                  },
                                ],
                                name: {
                                  type: "JSXIdentifier",
                                  name: "Usage",
                                },
                                selfClosing: true,
                              },
                              closingElement: null,
                              children: [],
                              data: {
                                _mdxExplicitJsx: true,
                              },
                            },
                          },
                        },
                      ],
                      sourceType: "module",
                      comments: [],
                    },
                  },
                },
              ],
            };
          }

          if (node.name === "PropsTable") {
            parent.children[index] = {
              type: "mdxJsxFlowElement",
              name: "PropsTable",
              attributes: [
                {
                  type: "mdxJsxAttribute",
                  name: "props",
                  value: {
                    type: "mdxJsxAttributeValueExpression",
                    value: `(${propsJSON})`,
                    data: {
                      estree: fromJs(`(${propsJSON})`, {
                        module: true,
                      }),
                    },
                  },
                },
              ],
            };
          }
        }
      },
    );
  };
}

// noinspection JSUnusedGlobalSymbols
const tsParser = withCustomConfig("tsconfig.json", {
  savePropValueAsString: false,
  skipChildrenPropWithoutDoc: false,
  shouldExtractLiteralValuesFromEnum: true,
  shouldExtractValuesFromUnion: true,
  shouldRemoveUndefinedFromOptional: true,
  propFilter: (prop) => {
    if (["as", "ref", "style", "className", "tagName"].includes(prop.name)) {
      return false;
    }

    if (prop.description.includes("@ignore")) {
      return false;
    }

    if (prop.declarations && prop.declarations.length > 0) {
      return prop.declarations.find((declaration) => !declaration.fileName.includes("node_modules")) !== undefined;
    }

    return true;
  },
});

const getComponentProps = (virtualDir, componentFile, componentName) => {
  const componentPropsFile = join(virtualDir, `${componentName}.json`);

  if (existsSync(componentPropsFile) && statSync(componentPropsFile).mtimeMs > statSync(componentFile).mtimeMs) {
    return JSON.parse(readFileSync(componentPropsFile, "utf8"));
  }

  const componentDoc = tsParser.parse(componentFile).find((c) => c.displayName === componentName);

  const props = componentDoc
    ? Object.entries(componentDoc.props).map(([key, value]) => {
        const type = {
          type: value.type.name,
          control: value.type.name,
          typeValues: null,
        };

        if (value.type.name === "enum") {
          if (!value.type.raw) {
            type.type = value.type.name;
          } else if (
            value.type.raw.includes(" | ") ||
            ["string", "number", "boolean", "ReactNode"].includes(value.type.raw)
          ) {
            type.type = value.type.raw;
            type.control = value.type.raw;

            if (value.type.raw.includes(" | ")) {
              type.control = "select";
              type.typeValues = value.type.value
                .map((item) => item.value)
                .filter((v) => v !== "number" && v !== "string");
            }
          } else {
            const typeValues = value.type.value.map((item) => item.value);
            type.type = typeValues.join(" | ");
            type.control = "select";
            type.typeValues = typeValues.filter((v) => v !== "number" && v !== "string");
          }
        }

        if (!value.required) {
          type.type = type.type.replace(" | undefined", "");
        }

        if (type.type.startsWith("NonNullable<")) {
          type.type = type.type.slice(12, -1).replace(" | null", "").replace(" | undefined", "");
        }

        type.type = type.type.replace("React.", "").replace(/ReactElement<.*>/g, "ReactElement");

        return {
          name: key,
          ...type,
          required: value.required,
          description: value.description,
          defaultValue: value.defaultValue?.value ?? "",
        };
      })
    : null;

  props?.sort((a, b) => {
    if (a.required && !b.required) {
      return -1;
    }

    if (b.required && !a.required) {
      return 1;
    }

    return 0;
  });

  writeFileSync(componentPropsFile, JSON.stringify(props), "utf8");

  return props;
};
