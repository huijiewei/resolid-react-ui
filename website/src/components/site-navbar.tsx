import { Button, Tooltip, TooltipArrow, TooltipContent, TooltipTrigger, tx } from "@resolid/react-ui";
import { useState } from "react";
import { Link } from "react-router";
import { ColorModeToggle } from "~/components/color-mode-toggle";
import { HistoryNavLink } from "~/components/history-link";
import { ResolidLogo } from "~/components/resolid-logo";
import { ResolidUiLogo } from "~/components/resolid-ui-logo";
import { SpriteIcon } from "~/components/sprite-icon";

export const SiteNavbar = () => {
  const [opened, setOpened] = useState(false);

  return (
    <nav className={"xl:max-w-288 mx-auto flex h-16 items-center justify-between gap-4 px-4"}>
      <Link to={"/"} aria-label={"Resolid React UI"}>
        <ResolidUiLogo />
      </Link>
      <div
        className={tx(
          "bg-bg-normal absolute inset-x-0 top-[calc(var(--spacing)*16+1px)] z-20 h-screen grow p-0",
          "md:relative md:top-0 md:block md:h-auto md:bg-inherit",
          opened ? "block" : "hidden",
        )}
      >
        <ul
          className={tx(
            "mx-auto flex max-w-xs list-none flex-col justify-end p-4 text-center font-medium tracking-widest",
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
                  onClick={() => setOpened(false)}
                  to={menu.href}
                  end={menu.end}
                >
                  {menu.name}
                </HistoryNavLink>
              </li>
            );
          })}
          <li className={"inline-flex justify-center p-5 md:hidden"}>
            <a href={"https://www.resolid.tech"} target={"_blank"} rel={"noreferrer"}>
              <ResolidLogo height={16} />
            </a>
          </li>
        </ul>
      </div>
      <div className={"text-fg-muted inline-flex items-center gap-1"}>
        <ColorModeToggle />
        <Tooltip placement={"bottom"}>
          <TooltipTrigger
            render={(props) => (
              <Button
                variant={"ghost"}
                color={"neutral"}
                size={"sm"}
                iconOnly
                aria-label={"Github 上的 Resolid React UI"}
                render={(props) => (
                  <a
                    href={"https://github.com/huijiewei/resolid-react-ui"}
                    target={"_blank"}
                    rel={"noreferrer"}
                    {...props}
                  >
                    <SpriteIcon size={"1.325em"} name={"github"} />
                  </a>
                )}
                {...props}
              />
            )}
          />
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
        <Tooltip placement={"bottom"}>
          <TooltipTrigger
            render={(props) => (
              <a
                {...props}
                className={"hover:text-fg-primary ms-3 hidden md:block"}
                aria-label={"Resolid Tech"}
                href={"https://www.resolid.tech"}
                target={"_blank"}
                rel={"noreferrer"}
              >
                <ResolidLogo height={16} />
              </a>
            )}
          />
          <TooltipContent>
            <TooltipArrow />
            访问 Resolid.tech
          </TooltipContent>
        </Tooltip>
      </div>
    </nav>
  );
};
