import type { MouseEvent } from "react";
import { type HtmlProps, Polymorphic, type PolymorphicProps } from "../../primitives";
import { AngleLeftIcon, AngleRightIcon } from "../../shared/icons";
import { ariaAttr, tx } from "../../utils";
import { type Color, currentPageColorStyles } from "./pagination.styles";
import type { PageType } from "./use-pagination";

export type PaginationItemProps = {
  page: number;
  pageType: PageType;
  disabled: boolean;
  color: Color;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

type PaginationItemHtmlProps = HtmlProps<"button", PaginationItemProps>;

export const PaginationItem = (props: PolymorphicProps<PaginationItemHtmlProps, PaginationItemProps, "type">) => {
  const { render, color, disabled, page, pageType, currentPage, setCurrentPage, className, children, ...rest } = props;

  const title = pageType == "previous" ? "上一页" : pageType == "next" ? "下一页" : `第 ${page} 页`;
  const current = pageType == "page" && page == currentPage;
  const currentStyle = currentPageColorStyles[color];

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();

    if (disabled) {
      return;
    }

    setCurrentPage(page);
  };

  return (
    <Polymorphic<PaginationItemHtmlProps>
      as={"button"}
      render={render}
      type={!render ? "button" : undefined}
      title={title}
      aria-label={title}
      aria-disabled={ariaAttr(disabled)}
      className={tx(
        "inline-flex h-8 min-w-8 select-none appearance-none items-center justify-center rounded-md px-2",
        current ? ["text-fg-emphasized", currentStyle] : "bg-bg-subtle",
        disabled ? "opacity-60" : !current && "hover:bg-bg-muted cursor-pointer",
        className,
      )}
      onClick={handleClick}
      {...rest}
    >
      {children ? (
        children
      ) : pageType == "previous" ? (
        <AngleLeftIcon />
      ) : pageType == "next" ? (
        <AngleRightIcon />
      ) : pageType == "end-ellipsis" || pageType == "start-ellipsis" ? (
        "..."
      ) : (
        page
      )}
    </Polymorphic>
  );
};
