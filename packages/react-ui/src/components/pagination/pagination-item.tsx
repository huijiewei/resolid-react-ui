import { type HtmlProps, Polymorphic, type PolymorphicProps } from "../../primitives";
import { AngleLeftIcon, AngleRightIcon } from "../../shared/icons";
import { disabledShareStyles } from "../../shared/styles";
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
        disabled ? disabledShareStyles : !current && "hover:bg-bg-muted cursor-pointer",
        className,
      )}
      onClick={() => setCurrentPage(page)}
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
