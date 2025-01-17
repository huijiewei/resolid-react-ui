import { MDXProvider } from "@mdx-js/react";
import { cx } from "@resolid/react-ui";
import { startWith } from "@resolid/utils";
import { type ComponentProps, type ReactNode, useRef } from "react";
import { Outlet, useLoaderData } from "react-router";
import { ClipboardButton } from "~/components/clipboard-button";
import { SpriteIcon } from "~/components/sprite-icon";
import { getMdxMeta } from "~/utils/mdx-utils.server";
import { mergeMeta } from "~/utils/react-router-meta";
import type { Route } from "./+types/_layout";

// noinspection JSUnusedGlobalSymbols
const mdxComponents = {
  h2: ({ id, children, className, ...rest }: ComponentProps<"h2">) => {
    return (
      <h2 className={cx("group relative mt-8 flex items-center", className)} {...rest}>
        <span id={id} className={"invisible absolute top-[calc(-1*88px)]"} />
        {children}
        <a tabIndex={-1} className={"ml-1 opacity-0 transition-opacity group-hover:opacity-100"} href={`#${id}`}>
          <SpriteIcon size={"sm"} name={"link"} />
        </a>
      </h2>
    );
  },
  h3: ({ id, children, className, ...rest }: ComponentProps<"h3">) => {
    return (
      <h3 className={cx("group relative mt-6 flex items-center", className)} {...rest}>
        <span id={id} className={"invisible absolute top-[calc(-1*88px)]"} />
        {children}
        <a tabIndex={-1} className={"ml-1 opacity-0 transition-opacity group-hover:opacity-100"} href={`#${id}`}>
          <SpriteIcon size={"sm"} name={"link"} />
        </a>
      </h3>
    );
  },
  pre: ({ children, className, ...rest }: ComponentProps<"pre"> & { "data-inline"?: boolean }) => {
    if (rest["data-inline"]) {
      rest["data-inline"] = undefined;

      return (
        <pre className={className} {...rest}>
          {children}
        </pre>
      );
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const preRef = useRef<HTMLPreElement>(null);

    return (
      <div className={"relative"}>
        <pre
          ref={preRef}
          translate={"no"}
          className={cx(
            "scrollbar scrollbar-thin border-bd-normal rounded-md border p-3 group-[.demo]:mt-0 group-[.demo]:rounded-t-none group-[.demo]:border-t-0",
            className,
          )}
          tabIndex={-1}
          {...rest}
        >
          {children}
        </pre>
        <div className={"z-base absolute right-1.5 top-1.5"}>
          <ClipboardButton content={preRef.current?.innerText ?? ""} />
        </div>
      </div>
    );
  },
  a: ({ children, href = "", className, ...rest }: ComponentProps<"a">) => {
    const external = startWith(href, "http://") || startWith(href, "https://");

    return (
      <a
        href={href}
        className={cx(
          "text-link hover:text-link-hovered active:text-link-pressed inline-flex items-center no-underline hover:underline",
          className,
        )}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        {...rest}
      >
        {children}
        {external && <SpriteIcon size={"xs"} className={"ml-1"} name={"external-link"} />}
      </a>
    );
  },
  blockquote: (props: ComponentProps<"blockquote"> & { "data-type": string }) => {
    if (props["data-type"]) {
      const alertType = props["data-type"];

      return (
        <div
          role={"alert"}
          className={cx(
            "my-5 flex gap-3 rounded-md px-4",
            alertType == "NOTE" && "bg-bg-primary",
            alertType == "TIP" && "bg-bg-success",
            alertType == "IMPORTANT" && "bg-bg-important",
            alertType == "WARNING" && "bg-bg-warning",
            alertType == "CAUTION" && "bg-bg-danger",
          )}
        >
          <span
            className={cx(
              "pt-6.75 shrink-0",
              alertType == "NOTE" && "text-fg-primary",
              alertType == "TIP" && "text-fg-success",
              alertType == "IMPORTANT" && "text-fg-important",
              alertType == "WARNING" && "text-fg-warning",
              alertType == "CAUTION" && "text-fg-danger",
            )}
          >
            <SpriteIcon size={"1rem"} name={`github-${alertType}`} />
          </span>
          <div className={"flex-1"}>{props.children}</div>
        </div>
      );
    }

    return <blockquote {...props} />;
  },
  ComponentDemo: ({ children }: { children: ReactNode[] }) => {
    return (
      <div className={"demo group"}>
        <div className={"not-prose scrollbar scrollbar-thin border-bd-normal overflow-x-auto rounded-t-md border p-3"}>
          {children?.[1]}
        </div>
        {children?.[0]}
      </div>
    );
  },
  PropsTable: ({
    props,
  }: {
    props: {
      name: string;
      type: string;
      control: string;
      typeValues: null | string[];
      description: string;
      defaultValue?: string;
      required: boolean;
    }[];
  }) => {
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
          {props.map((prop, i) => (
            <tr
              className={
                "border-b-bg-subtle md:flex-no-wrap mb-[1px] flex flex-row flex-wrap border-b pb-[1px] last:mb-0 last:border-none last:pb-0 md:mb-0 md:table-row md:border-none"
              }
              key={`${prop.name}-${i}`}
            >
              <td className={"block w-full whitespace-nowrap font-bold md:table-cell md:w-auto md:p-2"}>
                <span className="bg-bg-subtle mr-3 inline-block w-[5.5rem] p-2 text-sm font-bold md:hidden">属性</span>
                <span className={"inline-flex items-center gap-1.5"}>{prop.name}</span>
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
              className={cx(
                "border-s-bd-normal -ml-px block border-s py-1",
                depth == 2 ? "ps-4" : "ps-8",
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

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { pathname } = new URL(request.url);
  const basename = pathname.replace("/docs", "");

  const githubRepo = "https://github.com/huijiewei/resolid-react-ui/blob/main";
  const docPath = "src/routes/docs/_mdx";
  const docFile = `${docPath}${basename == "" ? "/_index" : basename}.mdx`;

  const isComponentDoc = basename.startsWith("/components/");
  const componentName = basename.replace("/components/", "");

  const data = await getMdxMeta(docFile);

  return {
    sourceLink: isComponentDoc
      ? `${githubRepo}/packages/react-ui/src/components/${componentName}/${componentName}.tsx`
      : null,
    documentLink: `${githubRepo}/website/${docFile}`,
    ...data,
  };
};

// noinspection JSUnusedGlobalSymbols
export default function Layout() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <article
        className={
          "prose dark:prose-invert w-full max-w-none px-4 py-6 md:px-6 lg:max-w-[calc(100%-theme(spacing.48))]"
        }
      >
        <div className={"flex items-start justify-between"}>
          <h1 className={"mb-0 text-[1.875rem]"}>{data.meta.title}</h1>
          {data.sourceLink && (
            <a className={"text-sm"} href={data.sourceLink} target={"_blank"} rel={"noreferrer"}>
              查看源代码
            </a>
          )}
        </div>
        <p>{data.meta.description}</p>
        <MDXProvider disableParentContext components={mdxComponents}>
          <Outlet />
        </MDXProvider>
        <p>
          <a className={"text-sm"} href={data.documentLink} target={"_blank"} rel={"noreferrer"}>
            建议更改此页面
          </a>
        </p>
      </article>
      <nav className={"hidden w-48 shrink-0 lg:block"}>
        <Toc toc={data.toc} />
      </nav>
    </>
  );
}
