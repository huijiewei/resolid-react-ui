import { MDXProvider } from "@mdx-js/react";
import { clsx } from "@resolid/react-ui";
import { startWith } from "@resolid/utils";
import type { ComponentProps } from "react";
import { Outlet } from "react-router";
import { SpriteIcon } from "~/components/sprite-icon";

// noinspection JSUnusedGlobalSymbols
const mdxComponents = {
  h2: ({ id, children, className, ...rest }: ComponentProps<"h2">) => {
    return (
      <h2 className={clsx("group relative flex items-center", className)} {...rest}>
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
      <h3 className={clsx("group relative flex items-center", className)} {...rest}>
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
            "scrollbar scrollbar-thin border-bd-normal rounded border p-3 group-[.example]:mt-0 group-[.example]:rounded-t-none group-[.example]:border-t-0",
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
};

// noinspection JSUnusedGlobalSymbols
export default function Layout() {
  return (
    <>
      <article
        className={
          "prose dark:prose-invert w-full max-w-none px-4 py-6 md:px-6 lg:max-w-[calc(100%-theme(spacing.48))]"
        }
      >
        <MDXProvider disableParentContext components={mdxComponents}>
          <Outlet />
        </MDXProvider>
      </article>
      <nav className={"hidden w-48 shrink-0 lg:block"}>
        <ul className={"sticky top-16 p-4 text-sm"}></ul>
      </nav>
    </>
  );
}
