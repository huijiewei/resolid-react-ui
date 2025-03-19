import type { ReactElement } from "react";
import type { PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";
import { PaginationItem, type PaginationItemProps } from "./pagination-item";
import type { PageColor } from "./pagination.styles";
import { usePagination, type UsePaginationOptions } from "./use-pagination";

export type PaginationProps = UsePaginationOptions & {
  /**
   * 颜色
   * @default "primary"
   */
  color?: PageColor;

  /**
   * 分页项目渲染
   */
  renderItem?: (props: PaginationItemProps) => ReactElement;

  /**
   * 总数显示渲染
   */
  renderTotal?: (total: number, totalPages: number) => ReactElement;
};

export const Pagination = (props: PrimitiveProps<"nav", PaginationProps, "role">) => {
  const {
    page,
    defaultPage,
    onChange,
    total,
    pageSize,
    siblings,
    boundaries,
    disabled,
    color = "primary",
    renderItem = (props) => <PaginationItem {...props} />,
    renderTotal,
    className,
    ...rest
  } = props;

  const { pageItems, totalPages, currentPage, setCurrentPage } = usePagination({
    page,
    defaultPage,
    onChange,
    total,
    pageSize,
    siblings,
    boundaries,
    disabled,
  });

  return (
    <nav
      role={"navigation"}
      aria-label={"Pagination"}
      className={tx("flex w-auto items-center gap-2", className)}
      {...rest}
    >
      {renderTotal?.(total, totalPages)}
      <ul className={"flex flex-nowrap gap-1"}>
        {pageItems.map((item) => (
          <li key={`${item.pageType}-${item.page}`}>
            {renderItem({
              ...item,
              color,
              currentPage,
              setCurrentPage,
            })}
          </li>
        ))}
      </ul>
    </nav>
  );
};
