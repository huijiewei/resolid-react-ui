import { MDXProvider } from "@mdx-js/react";
import { type Dict, type PrimitiveProps, tx } from "@resolid/react-ui";
import { startsWith } from "@resolid/utils";
import { Children, type ComponentProps, isValidElement, type ReactElement, type ReactNode } from "react";
import { Outlet } from "react-router";
import { MdxBlockQuote } from "~/components/mdx-block-quote";
import { MdxCode } from "~/components/mdx-code";
import { MdxCodeDemo, type PropItem } from "~/components/mdx-code-demo";
import { MdxCodeGroup } from "~/components/mdx-code-group";
import { MdxDetails } from "~/components/mdx-details";
import { MdxHeading } from "~/components/mdx-heading";
import { MdxPropsTable } from "~/components/mdx-props-table";
import { MdxToc } from "~/components/mdx-toc";
import { SpriteIcon } from "~/components/sprite-icon";
import { getMdxMeta } from "~/utils/mdx-utils.server";
import { mergeMeta } from "~/utils/react-router-meta";
import type { Route } from "./+types/_layout";

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
  blockquote: MdxBlockQuote,
  Details: ({ children, ...rest }: ComponentProps<"details">) => {
    const items = Children.toArray(children);

    const summary = items.find(
      (item): item is ReactElement<ComponentProps<"summary">> => isValidElement(item) && item.type == "summary",
    );

    return (
      <MdxDetails summary={summary} {...rest}>
        {items.filter((item) => item != summary)}
      </MdxDetails>
    );
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
            <MdxCodeDemo componentProps={componentProps} settingProps={settingProps}>
              {children[1] as unknown as (props: Dict<string | boolean | number | undefined>) => ReactNode}
            </MdxCodeDemo>
          ) : (
            <div className={"flex min-w-max justify-center"}>{children[1]}</div>
          )}
        </div>
        {children[0]}
      </div>
    );
  },
  PropsTable: MdxPropsTable,
  CodeGroup: MdxCodeGroup,
};

// noinspection JSUnusedGlobalSymbols
export const meta = mergeMeta(({ loaderData }: Route.MetaArgs) => {
  return [
    {
      title: loaderData?.meta.title,
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
        <MdxToc toc={loaderData.toc} />
      </nav>
    </>
  );
}
