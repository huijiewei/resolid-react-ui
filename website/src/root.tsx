import type { PropsWithChildren } from "react";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { RouteProcessBar } from "~/components/route-process-bar";
import { VercelAnalytics } from "~/components/vercel-analytics";

import "./root.css";

// noinspection JSUnusedGlobalSymbols
export const Layout = ({ children }: PropsWithChildren) => {
  // noinspection HtmlRequiredTitleElement
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0969da" />
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <Meta />
        <Links />
      </head>
      <body className={"min-h-screen overflow-y-scroll antialiased"}>
        <RouteProcessBar />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

// noinspection JSUnusedGlobalSymbols
export default function Root() {
  return (
    <>
      {!!import.meta.env.VITE_VERCEL_URL && <VercelAnalytics endpoint={"/growth"} scriptSrc={"/growth/script.js"} />}
      <Outlet />
    </>
  );
}

// noinspection JSUnusedGlobalSymbols
export const HydrateFallback = () => <p className={"p-20 text-center"}>正在加载</p>;
