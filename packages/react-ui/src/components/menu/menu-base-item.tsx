import { useListItem } from "@floating-ui/react";
import { isString } from "@resolid/utils";
import { useMergeRefs } from "../../hooks";
import { type HtmlProps, Polymorphic, type PolymorphicProps } from "../../primitives";
import { ariaAttr, dataAttr, tx } from "../../utils";
import { useMenuItem } from "./menu-item-context";

export type MenuBaseItemProps = {
  /**
   * 用于菜单的提前导航文本。如果未提供，将使用菜单项的文本内容
   */
  label?: string;

  /**
   * 该项目是否被禁用
   * @default false
   */
  disabled?: boolean;
};

type MenuBaseItemHtmlProps = HtmlProps<"div", MenuBaseItemProps>;

export const MenuBaseItem = (props: PolymorphicProps<MenuBaseItemHtmlProps, MenuBaseItemProps, "tabIndex">) => {
  const { render, className, ref, children, label, role, disabled = false, ...rest } = props;

  const { getItemProps, activeIndex } = useMenuItem();
  const { ref: itemRef, index } = useListItem({ label: label ?? (isString(children) ? children : null) });

  const active = index !== null && index === activeIndex;

  const refs = useMergeRefs(ref, itemRef);

  return (
    <Polymorphic<MenuBaseItemHtmlProps>
      as={"div"}
      render={render}
      ref={refs}
      role={role ?? "menuitem"}
      aria-disabled={ariaAttr(disabled)}
      data-active={dataAttr(active)}
      tabIndex={active ? 0 : -1}
      className={tx(
        "flex w-full select-none items-center rounded-md px-2 py-1.5 outline-none transition-colors disabled:cursor-default",
        disabled ? "text-fg-muted" : "active:bg-bg-subtle",
        className,
      )}
      {...getItemProps(rest)}
    >
      {children}
    </Polymorphic>
  );
};
