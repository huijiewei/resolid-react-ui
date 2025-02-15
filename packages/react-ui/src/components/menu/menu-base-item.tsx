import { useListItem } from "@floating-ui/react";
import { isString } from "@resolid/utils";
import { useButtonProps, useMergeRefs } from "../../hooks";
import { type HtmlProps, Polymorphic, type PolymorphicProps } from "../../primitives";
import { dataAttr, tx } from "../../utils";
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

type MenuBaseItemHtmlProps = HtmlProps<"div", MenuBaseItemProps, "tabIndex">;

export const MenuBaseItem = (props: PolymorphicProps<MenuBaseItemHtmlProps, MenuBaseItemProps>) => {
  const { render, className, ref, children, label, disabled = false, ...rest } = props;

  const { getItemProps, activeIndex } = useMenuItem();
  const { ref: itemRef, index } = useListItem({ label: label ?? (isString(children) ? children : null) });

  const active = index !== null && index === activeIndex;

  const { getButtonProps, buttonRef } = useButtonProps({
    tabIndex: active ? 0 : -1,
    role: "menuitem",
    disabled,
  });

  const refs = useMergeRefs(ref, itemRef, buttonRef);

  return (
    <Polymorphic<MenuBaseItemHtmlProps>
      as={"div"}
      render={render}
      ref={refs}
      data-active={dataAttr(active)}
      className={tx(
        "flex w-full select-none items-center rounded-md px-2 py-1.5 outline-none transition-colors",
        disabled ? "text-fg-muted" : "active:bg-bg-subtle",
        className,
      )}
      {...getItemProps(getButtonProps(rest))}
    >
      {children}
    </Polymorphic>
  );
};
