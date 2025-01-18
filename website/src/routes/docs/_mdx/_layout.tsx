import { MDXProvider } from "@mdx-js/react";
import { clsx } from "@resolid/react-ui";
import { startWith } from "@resolid/utils";
import type { ComponentProps } from "react";
import { Outlet, useLoaderData, useLocation } from "react-router";
import { ComponentDemo } from "~/components/component-demo";
import { SpriteIcon } from "~/components/sprite-icon";
import { getMdxMeta } from "~/utils/mdx-utils.server";
import { mergeMeta } from "~/utils/react-router-meta";
import type { Route } from "./+types/_layout";

// noinspection JSUnusedGlobalSymbols
const mdxComponents = {
  h2: ({ id, children, className, ...rest }: ComponentProps<"h2">) => {
    return (
      <h2 className={clsx("group relative mt-8 flex items-center", className)} {...rest}>
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
      <h3 className={clsx("group relative mt-6 flex items-center", className)} {...rest}>
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

    return (
      <div className={"relative"}>
        <pre
          translate={"no"}
          className={clsx(
            "scrollbar scrollbar-thin border-bd-normal rounded-md border p-3 group-[.demo]:mt-0 group-[.demo]:rounded-t-none group-[.demo]:border-t-0",
            className,
          )}
          tabIndex={-1}
          {...rest}
        >
          {children}
        </pre>
      </div>
    );
  },
  a: ({ children, href = "", className, ...rest }: ComponentProps<"a">) => {
    const external = startWith(href, "http://") || startWith(href, "https://");

    return (
      <a
        href={href}
        className={clsx(
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
          className={clsx(
            "my-5 flex gap-3 rounded-md px-4",
            alertType == "NOTE" && "bg-bg-primary",
            alertType == "TIP" && "bg-bg-success",
            alertType == "IMPORTANT" && "bg-bg-important",
            alertType == "WARNING" && "bg-bg-warning",
            alertType == "CAUTION" && "bg-bg-danger",
          )}
        >
          <span
            className={clsx(
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
  ComponentDemo,
};

// eslint-disable-next-line react-refresh/only-export-components
const Toc = ({ toc }: { toc: { depth: number; text: string; slug: string }[] }) => {
  const { hash } = useLocation();
  const currentHash = decodeURIComponent(hash);

  return (
    <ul className={"sticky top-16 p-4 text-sm"}>
      {toc.map(({ depth, slug, text }) => {
        const href = `#${slug}`;

        return (
          <li key={slug}>
            <a
              href={href}
              className={clsx(
                "border-s-bd-normal -ml-px block border-s py-1",
                depth == 2 ? "ps-4" : "ps-8",
                href == currentHash
                  ? "border-link text-link"
                  : "text-fg-muted hover:border-link-hovered hover:text-fg-subtle",
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
