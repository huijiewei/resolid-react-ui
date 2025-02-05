import { Button, Tooltip, TooltipArrow, TooltipContent, TooltipTrigger, tx } from "@resolid/react-ui";
import { type MouseEventHandler, useState } from "react";
import { Link, Outlet } from "react-router";
import { ColorModeToggle } from "~/components/color-mode-toggle";
import { HistoryNavLink } from "~/components/history-link";
import { ResolidLogo } from "~/components/resolid-logo";
import { SpriteIcon } from "~/components/sprite-icon";

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

// noinspection JSUnusedGlobalSymbols
export default function Layout() {
  return (
    <>
      <header className={"bg-bg-normal border-b-bd-normal sticky top-0 z-20 w-full border-b"}>
        <NavBar />
      </header>
      <div className={"min-h-[calc(100vh-var(--spacing)*16-78px)]"}>
        <Outlet />
      </div>
      <footer className={"border-t-bd-normal border-t"}>
        <div className={"text-fg-muted max-w-288 mx-auto flex flex-col gap-1 p-4 text-center text-sm"}>
          <p>Released under the MIT License</p>
          <p>Copyright Ⓒ 2022-present Resolid Tech</p>
        </div>
      </footer>
    </>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
const NavBar = () => {
  const [opened, setOpened] = useState(false);

  return (
    <nav className={"xl:max-w-288 mx-auto flex h-16 items-center justify-between gap-3 px-4"}>
      <Link to={"/"} aria-label={"Resolid React UI"}>
        <ResolidLogo />
      </Link>
      <div
        className={tx(
          "bg-bg-normal absolute inset-x-0 top-[calc(var(--spacing)*16+1px)] z-20 h-screen p-0",
          "md:relative md:top-0 md:block md:h-auto md:bg-inherit",
          opened ? "block" : "hidden",
        )}
      >
        <NavMenu onClick={() => setOpened(false)} />
      </div>

      <div className={"text-fg-muted inline-flex items-center gap-1"}>
        <ColorModeToggle />
        <Tooltip placement={"bottom-end"}>
          <TooltipTrigger
            as={"a"}
            className={
              "focus-visible:outline-bg-neutral-emphasis/70 hover:bg-bg-neutral active:bg-bg-neutral-hovered inline-flex aspect-square h-8 cursor-pointer select-none appearance-none items-center justify-center whitespace-nowrap rounded-md border border-transparent text-sm font-medium outline-2 outline-offset-2 outline-transparent transition-colors"
            }
            aria-label={"Github 上的 Resolid React UI"}
            href={"https://github.com/huijiewei/resolid-react-ui"}
            target={"_blank"}
            rel={"noreferrer"}
          >
            <SpriteIcon size={"1.5em"} name={"github"} />
          </TooltipTrigger>
          <TooltipContent>
            <TooltipArrow />
            Github 上的 Resolid React UI
          </TooltipContent>
        </Tooltip>
        <Button
          iconOnly
          variant={"ghost"}
          color={"neutral"}
          aria-label={"导航菜单"}
          className={"md:hidden"}
          onClick={() => setOpened((prev) => !prev)}
        >
          {opened ? <SpriteIcon size={"1.5em"} name={"close"} /> : <SpriteIcon size={"1.5em"} name={"menu"} />}
        </Button>
      </div>
    </nav>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
const NavMenu = ({ onClick }: { onClick?: MouseEventHandler<HTMLAnchorElement> }) => {
  return (
    <ul
      className={tx(
        "mx-auto flex max-w-xs list-none flex-col p-4 text-center font-medium tracking-widest",
        "md:max-w-none md:flex-row md:p-0 md:tracking-normal",
      )}
    >
      {[
        { name: "主页", href: "", end: true },
        { name: "文档", href: "docs" },
        { name: "关于", href: "about" },
      ].map((menu) => {
        return (
          <li className={"p-2.5 md:px-4"} key={menu.name}>
            <HistoryNavLink
              className={({ isActive }) => tx("hover:text-link-hovered block", isActive && "text-link-pressed")}
              onClick={onClick}
              to={menu.href}
              end={menu.end}
            >
              {menu.name}
            </HistoryNavLink>
          </li>
        );
      })}
    </ul>
  );
};
