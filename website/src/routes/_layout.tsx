import { Link, Outlet } from "react-router";
import { ResolidLogo } from "~/components/resolid-logo";

// noinspection JSUnusedGlobalSymbols
export const meta = () => {
  return [
    { title: "Resolid UI" },
    {
      name: "description",
      content: "React 19 components",
    },
  ];
};

export default function Layout() {
  return (
    <>
      <header className={"z-nav bg-bg-normal sticky top-0 w-full border-b"}>
        <nav className={"mx-auto flex h-16 items-center justify-between gap-3 px-4 xl:max-w-6xl"}>
          <Link to={"/"} aria-label={"Resolid React UI"}>
            <ResolidLogo />
          </Link>
        </nav>
      </header>
      <div className={"min-h-[calc(100vh-theme(space.16)-78px)]"}>
        <Outlet />
      </div>
      <footer className={"border-t"}>
        <div className={"text-fg-muted mx-auto flex max-w-6xl flex-col gap-1 p-4 text-center text-sm"}>
          <p>Released under the MIT License</p>
          <p>Copyright Ⓒ 2022-present Resolid Tech</p>
        </div>
      </footer>
    </>
  );
}
