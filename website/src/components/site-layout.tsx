import type { PropsWithChildren } from "react";
import { SiteNavbar } from "~/components/site-navbar";

export const SiteLayout = ({ children }: PropsWithChildren) => (
  <>
    <header className={"bg-bg-normal border-b-bd-normal sticky top-0 z-20 w-full border-b"}>
      <SiteNavbar />
    </header>
    <div className={"min-h-[calc(100vh-var(--spacing)*16-78px)]"}>{children}</div>
    <footer className={"border-t-bd-normal border-t"}>
      <div className={"text-fg-muted max-w-288 mx-auto flex flex-col gap-1 p-4 text-center text-sm"}>
        <p>Released under the MIT License</p>
        <p>Copyright Ⓒ 2022-present Resolid Tech</p>
      </div>
    </footer>
  </>
);
