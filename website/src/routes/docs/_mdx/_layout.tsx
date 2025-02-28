import { MDXProvider } from "@mdx-js/react";
import {
  Alert,
  AlertIndicator,
  type AlertProps,
  AlertTitle,
  Button,
  type Dict,
  Input,
  NativeSelect,
  NumberInput,
  Polymorphic,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  type PrimitiveProps,
  Switch,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
  tx,
} from "@resolid/react-ui";
import { startsWith } from "@resolid/utils";
import { type ComponentProps, type ReactNode, useState } from "react";
import { Outlet } from "react-router";
import { ClipboardButton } from "~/components/clipboard-button";
import { SpriteIcon } from "~/components/sprite-icon";
import { StackblitzButton } from "~/components/stackblitz-button";
import { getMdxMeta } from "~/utils/mdx-utils.server";
import { mergeMeta } from "~/utils/react-router-meta";
import type { Route } from "./+types/_layout";

type PropItem = {
  name: string;
  type: string;
  control: string;
  typeValues: null | string[];
  description: string;
  defaultValue?: string;
  required: boolean;
};

// eslint-disable-next-line react-refresh/only-export-components
const MdxHeading = (props: ComponentProps<"h2" | "h3" | "h4"> & { as: string }) => {
  const { as, id, children, className, ...rest } = props;

  return (
    <Polymorphic as={as} className={tx("group relative flex items-center", className)} {...rest}>
      <span id={id} className={"invisible absolute top-[calc(-1*88px)]"} />
      {children}
      <a tabIndex={-1} className={"ml-1 opacity-0 transition-opacity group-hover:opacity-100"} href={`#${id}`}>
        <SpriteIcon size={"0.75em"} name={"hash"} />
      </a>
    </Polymorphic>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
const MdxCode = (props: PrimitiveProps<"pre", { "data-inline"?: boolean; online?: string }>) => {
  const { children, className, "data-inline": dataInline, online, ...rest } = props;

  const [content, setContent] = useState("");

  if (dataInline) {
    return (
      <pre translate={"no"} className={className} {...rest}>
        {children}
      </pre>
    );
  }

  const preRef = (node: HTMLPreElement) => {
    if (node) {
      setContent(node.innerText);
    }
  };

  return (
    <div role={"figure"} className={"relative"}>
      <pre
        ref={preRef}
        translate={"no"}
        className={tx(
          "scrollbar scrollbar-thin border-bd-normal rounded-md border p-3",
          "group-[.is-demo]:mt-0 group-[.is-demo]:rounded-t-none group-[.is-demo]:border-t-0",
          className,
        )}
        {...rest}
        tabIndex={-1}
      >
        {children}
      </pre>
      <div className={"z-base absolute right-1.5 top-1.5 flex gap-1"}>
        {online && <StackblitzButton name={online} code={content} />}
        <ClipboardButton content={content} />
      </div>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
const MdxDemo = (props: {
  children: (props: Dict<string | boolean | number | undefined>) => ReactNode;
  componentProps: PropItem[];
  settingProps: string[];
}) => {
  const validProps = props.componentProps
    .filter((prop) => {
      return props.settingProps.includes(prop.name);
    })
    .sort((a, b) => {
      return props.settingProps.indexOf(a.name) - props.settingProps.indexOf(b.name);
    });

  const [state, setState] = useState<Dict<string | boolean | number | undefined>>(
    Object.fromEntries(
      validProps.map(({ name, defaultValue }) => {
        const value =
          defaultValue && /^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$/.test(defaultValue)
            ? defaultValue
            : defaultValue == "Number.MIN_SAFE_INTEGER" || defaultValue == "Number.MAX_SAFE_INTEGER"
              ? undefined
              : defaultValue == "true" || defaultValue == "false"
                ? defaultValue == "true"
                : defaultValue
                  ? defaultValue.slice(1, -1)
                  : undefined;

        return [name, value];
      }),
    ),
  );

  return (
    <div className={"relative"}>
      <div className={"flex min-h-32 min-w-max items-center justify-center"}>{props.children(state)}</div>
      <Popover placement={"top-end"}>
        <PopoverTrigger
          className={"absolute bottom-0 start-0"}
          render={(props) => <Button size={"xs"} variant={"soft"} color={"neutral"} {...props} />}
        >
          属性设置
        </PopoverTrigger>
        <PopoverContent className={"flex flex-col gap-3 p-3 text-sm"}>
          <PopoverArrow />
          {validProps.map((prop) => {
            const propInputId = `prop-${prop.name}`;

            return (
              <div className={"flex items-center justify-between gap-5"} key={propInputId}>
                {prop.control == "boolean" && (
                  <Switch
                    size={"sm"}
                    checked={Boolean(state[prop.name])}
                    onChange={(value) => {
                      setState((prev) => ({ ...prev, [prop.name]: value }));
                    }}
                  >
                    {prop.description}
                  </Switch>
                )}
                {prop.control == "string" && (
                  <>
                    <label htmlFor={propInputId}>{prop.description}</label>
                    <Input
                      id={propInputId}
                      size={"xs"}
                      className={"w-1/2"}
                      autoComplete={"off"}
                      value={state[prop.name] as string}
                      onChange={(value) => {
                        setState((prev) => ({ ...prev, [prop.name]: value }));
                      }}
                    />
                  </>
                )}
                {prop.control == "number" && (
                  <>
                    <label htmlFor={propInputId}>{prop.description}</label>
                    <NumberInput
                      id={propInputId}
                      size={"xs"}
                      className={"w-1/2"}
                      value={state[prop.name] ? Number(state[prop.name]) : undefined}
                      onChange={(value) => {
                        setState((prev) => ({ ...prev, [prop.name]: value }));
                      }}
                    />
                  </>
                )}
                {prop.control == "select" &&
                  (prop.name == "color" ? (
                    <>
                      <span>{prop.description}</span>
                      <div className={"inline-flex w-auto justify-between gap-1"}>
                        {prop.typeValues?.map((option) => {
                          const color = option.toString().slice(1, -1);

                          return (
                            <button
                              className={tx(
                                "text-fg-emphasized inline-flex h-6 w-6 items-center justify-center rounded-md",
                                color == "primary" && "bg-bg-primary-emphasis",
                                color == "secondary" && "bg-bg-secondary-emphasis",
                                color == "success" && "bg-bg-success-emphasis",
                                color == "warning" && "bg-bg-warning-emphasis",
                                color == "danger" && "bg-bg-danger-emphasis",
                                color == "neutral" && "bg-bg-neutral-emphasis",
                              )}
                              key={`${prop.name}-${color}`}
                              title={color}
                              onClick={() => {
                                setState((prev) => ({ ...prev, [prop.name]: color }));
                              }}
                            >
                              {state[prop.name] == color && <SpriteIcon size={"1.25em"} name={"check"} />}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <>
                      <label htmlFor={propInputId}>{prop.description}</label>
                      <NativeSelect
                        id={propInputId}
                        size={"xs"}
                        value={String(state[prop.name])}
                        onChange={(e) => {
                          setState((prev) => ({
                            ...prev,
                            [prop.name]:
                              e.target.value == "true" || e.target.value == "false"
                                ? e.target.value == "true"
                                : e.target.value,
                          }));
                        }}
                      >
                        {prop.typeValues?.map((item) => {
                          const option = item != "true" && item != "false" ? item.trim().slice(1, -1) : item;

                          return (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          );
                        })}
                      </NativeSelect>
                    </>
                  ))}
              </div>
            );
          })}
        </PopoverContent>
      </Popover>
    </div>
  );
};

// noinspection JSUnusedGlobalSymbols
const mdxComponents = {
  h2: ({ className, ...rest }: PrimitiveProps<"h2">) => {
    return <MdxHeading as={"h2"} className={tx("mt-8", className)} {...rest} />;
  },
  h3: ({ className, ...rest }: PrimitiveProps<"h3">) => {
    return <MdxHeading as={"h3"} className={tx("mt-6", className)} {...rest} />;
  },
  h4: ({ className, ...rest }: PrimitiveProps<"h3">) => {
    return <MdxHeading as={"h4"} className={tx("mt-6", className)} {...rest} />;
  },
  pre: MdxCode,
  a: ({ children, href = "", className, ...rest }: ComponentProps<"a">) => {
    const external = startsWith(href, "http://") || startsWith(href, "https://");

    return (
      <a
        href={href}
        className={tx(
          "text-link hover:text-link-hovered active:text-link-pressed inline-flex items-center no-underline hover:underline",
          className,
        )}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        {...rest}
      >
        {children}
        {external && <SpriteIcon size={"1em"} className={"ml-1"} name={"external-link"} />}
      </a>
    );
  },
  blockquote: (props: ComponentProps<"blockquote"> & { "data-type"?: string }) => {
    const { children, "data-type": dataType, ...rest } = props;

    if (dataType) {
      const alertColors = {
        NOTE: "primary",
        IMPORTANT: "secondary",
        TIP: "success",
        WARNING: "warning",
        CAUTION: "danger",
      };

      return (
        <Alert
          color={alertColors[dataType as keyof typeof alertColors] as AlertProps["color"]}
          className={"not-prose my-5 flex flex-row gap-2"}
        >
          <AlertIndicator className={"pt-1.75"}>
            <SpriteIcon name={`github-${dataType}`} />
          </AlertIndicator>
          <AlertTitle>{children}</AlertTitle>
        </Alert>
      );
    }

    return <blockquote {...rest}>{children}</blockquote>;
  },
  Kbd: ({ className, ...rest }: PrimitiveProps<"kbd">) => {
    return (
      <kbd
        className={tx(
          "border-bd-normal bg-bg-subtlest border-b-bg-muted inline-block rounded-md border font-mono text-xs font-bold shadow-sm",
          className,
        )}
        {...rest}
      />
    );
  },
  CodeDemo: (props: { children: [ReactNode, ReactNode]; componentProps?: PropItem[]; settingProps?: string[] }) => {
    const { children, componentProps, settingProps } = props;

    return (
      <div className={"is-demo group"}>
        <div className={"not-prose scrollbar scrollbar-thin border-bd-normal overflow-x-auto rounded-t-md border p-3"}>
          {componentProps && settingProps ? (
            <MdxDemo componentProps={componentProps} settingProps={settingProps}>
              {children[1] as unknown as (props: Dict<string | boolean | number | undefined>) => ReactNode}
            </MdxDemo>
          ) : (
            <div className={"flex min-w-max justify-center"}>{children[1]}</div>
          )}
        </div>
        {children[0]}
      </div>
    );
  },
  PropsTable: ({ componentProps }: { componentProps: PropItem[] }) => {
    return (
      <table className={"not-prose border-bd-subtle my-4 w-full table-auto border-separate rounded-md border text-sm"}>
        <thead>
          <tr className={"bg-bg-subtle"}>
            <th className={"hidden whitespace-nowrap p-2 text-left md:table-cell"}>属性</th>
            <th className={"hidden whitespace-nowrap p-2 text-left md:table-cell"}>类型</th>
            <th className={"hidden whitespace-nowrap p-2 text-center md:table-cell"}>默认值</th>
            <th className={"hidden whitespace-nowrap p-2 text-center md:table-cell"}>必须</th>
          </tr>
        </thead>
        <tbody>
          {componentProps.map((prop, i) => (
            <tr
              className={
                "border-b-bg-subtle md:flex-no-wrap mb-px flex flex-row flex-wrap border-b pb-px last:mb-0 last:border-none last:pb-0 md:mb-0 md:table-row md:border-none"
              }
              key={`${prop.name}-${i}`}
            >
              <td className={"block w-full whitespace-nowrap font-bold md:table-cell md:w-auto md:p-2"}>
                <span className="bg-bg-subtle mr-3 inline-block w-[5.5rem] p-2 text-sm font-bold md:hidden">属性</span>
                <span className={"inline-flex items-center gap-1.5"}>
                  {prop.name}

                  {prop.description && (
                    <Tooltip interactive>
                      <TooltipTrigger>
                        <SpriteIcon className={"hidden md:block"} size={"1.25em"} name={"info"} />
                      </TooltipTrigger>
                      <TooltipContent>
                        <TooltipArrow />
                        {prop.description.split("\n").map((p, idx) => {
                          const key = `p${idx}`;

                          if (p.slice(0, 6) == "@link") {
                            const link = p.slice(6);

                            return (
                              <p key={key}>
                                <a
                                  className={"text-link hover:text-link-hovered"}
                                  href={link}
                                  rel={"noreferrer"}
                                  target={"_blank"}
                                >
                                  {link}
                                </a>
                              </p>
                            );
                          }

                          return <p key={key}>{p}</p>;
                        })}
                      </TooltipContent>
                    </Tooltip>
                  )}
                </span>
              </td>
              <td className={"block w-full whitespace-nowrap font-bold md:hidden"}>
                <span className="bg-bg-subtle mr-3 inline-block w-[5.5rem] p-2 text-sm font-bold">简介</span>
                <span className={"inline-flex items-center gap-1.5"}>
                  {prop.description.split("\n").map((p, idx) => {
                    const key = `p${idx}`;

                    if (p.slice(0, 6) == "@link") {
                      const link = p.slice(6);

                      return (
                        <p key={key}>
                          <a
                            className={"text-link hover:text-link-hovered"}
                            href={link}
                            rel={"noreferrer"}
                            target={"_blank"}
                          >
                            {link}
                          </a>
                        </p>
                      );
                    }

                    return <p key={key}>{p}</p>;
                  })}
                </span>
              </td>
              <td className={"block w-full md:table-cell md:w-auto md:p-2"}>
                <span className="bg-bg-subtle mr-3 inline-block w-[5.5rem] p-2 text-sm font-bold md:hidden">类型</span>
                {prop.type}
              </td>
              <td className={"block w-full whitespace-nowrap md:table-cell md:w-auto md:p-2 md:text-center"}>
                <span className="bg-bg-subtle mr-3 inline-block w-[5.5rem] p-2 text-sm font-bold md:hidden">
                  默认值
                </span>
                {prop.defaultValue || "-"}
              </td>
              <td className={"block w-full whitespace-nowrap md:table-cell md:w-auto md:p-2 md:text-center"}>
                <span className="bg-bg-subtle mr-3 inline-block w-[5.5rem] p-2 text-sm font-bold md:hidden">必须</span>
                {prop.required ? "true" : "false"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
};

// eslint-disable-next-line react-refresh/only-export-components
const Toc = ({ toc }: { toc: { depth: number; text: string; slug: string }[] }) => {
  return (
    <ul className={"sticky top-16 p-4 text-sm"}>
      {toc.map(({ depth, slug, text }) => {
        const href = `#${slug}`;

        return (
          <li key={slug}>
            <a
              href={href}
              className={tx(
                "border-s-bd-normal -ml-px block border-s py-1",
                depth == 2 ? "ps-4" : depth == 3 ? "ps-8" : "ps-10",
                href == "1" ? "border-link text-link" : "text-fg-muted hover:border-link-hovered hover:text-fg-subtle",
              )}
            >
              {text}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

// noinspection JSUnusedGlobalSymbols
export const meta = mergeMeta(({ data }: Route.MetaArgs) => {
  return [
    {
      title: data.meta.title,
    },
  ];
});

// noinspection JSUnusedGlobalSymbols
export const loader = async ({ request }: Route.LoaderArgs) => {
  const { pathname } = new URL(request.url);
  const basename = pathname.replace("/docs", "");

  const githubRepo = "https://github.com/huijiewei/resolid-react-ui/blob/main";
  const docPath = "src/routes/docs/_mdx";
  const docFile = `${docPath}${basename == "" ? "/_index" : basename}.mdx`;

  const hasSource =
    basename.startsWith("/components/") && basename != "/components/icon" && basename != "/components/typography";
  const componentName = basename.replace("/components/", "");

  const data = await getMdxMeta(docFile);

  return {
    sourceLink: hasSource
      ? `${githubRepo}/packages/react-ui/src/components/${componentName}/${componentName}.tsx`
      : null,
    documentLink: `${githubRepo}/website/${docFile}`,
    ...data,
  };
};

// noinspection JSUnusedGlobalSymbols
export default function Layout({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <article
        className={
          "prose dark:prose-invert w-full max-w-none px-4 py-6 md:px-6 lg:max-w-[calc(100%-var(--spacing)*48)]"
        }
      >
        <div className={"flex items-start justify-between"}>
          <h1 className={"mb-0 text-[1.875rem]"}>{loaderData.meta.title}</h1>
          {loaderData.sourceLink && (
            <a className={"text-sm"} href={loaderData.sourceLink} target={"_blank"} rel={"noreferrer"}>
              查看源代码
            </a>
          )}
        </div>
        <p>{loaderData.meta.description}</p>
        <MDXProvider disableParentContext components={mdxComponents}>
          <Outlet />
        </MDXProvider>
        <p>
          <a className={"text-sm"} href={loaderData.documentLink} target={"_blank"} rel={"noreferrer"}>
            建议更改此页面
          </a>
        </p>
      </article>
      <nav className={"hidden w-48 shrink-0 lg:block"}>
        <Toc toc={loaderData.toc} />
      </nav>
    </>
  );
}
