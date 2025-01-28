import { useListItem } from "@floating-ui/react";
import type { ElementType } from "react";
import { useButtonProps, useMergeRefs } from "../../hooks";
import type { PolymorphicProps } from "../../primitives";
import { dataAttr, tx } from "../../utils";
import { useMenuItem } from "./menu-item-context";

export type MenuBaseItemProps = {
  /**
   * 用于菜单的提前导航文本。如果未提供，将使用菜单项的文本内容
   */
  label?: string;

  /**
   * 该项目是否被禁用
   */
  disabled?: boolean;
};

export const MenuBaseItem = <T extends ElementType = "div">(props: PolymorphicProps<T, MenuBaseItemProps>) => {
  const { as: Component = "div", tagName, className, ref, children, label, disabled = false, ...rest } = props;

  const { getItemProps, activeIndex } = useMenuItem();
  const { ref: itemRef, index } = useListItem({ label: label ?? (typeof children == "string" ? children : null) });

  const active = index !== null && index === activeIndex;

  const { getButtonProps, buttonRef } = useButtonProps({
    tagName,
    tabIndex: active ? 0 : -1,
    role: "menuitem",
    disabled,
  });

  const refs = useMergeRefs(ref, itemRef, buttonRef);

  return (
    <Component
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
    </Component>
  );
};
