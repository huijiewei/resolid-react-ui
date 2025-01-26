import { useListItem } from "@floating-ui/react";
import { useMergeRefs } from "../../hooks";
import type { PolymorphicProps } from "../../primitives";
import { ariaAttr, dataAttr, tx } from "../../utils";
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

export const MenuBaseItem = (props: PolymorphicProps<"div", MenuBaseItemProps, "tabIndex">) => {
  const { as: Component = "div", className, role, ref, children, label, disabled = false, ...rest } = props;

  const { getItemProps, activeIndex } = useMenuItem();
  const { ref: itemRef, index } = useListItem({ label: label ?? (typeof children == "string" ? children : null) });

  const refs = useMergeRefs(ref, itemRef);

  const active = index !== null && index === activeIndex;

  return (
    <Component
      ref={refs}
      role={role ?? "menuitem"}
      aria-disabled={ariaAttr(disabled)}
      data-active={dataAttr(active)}
      tabIndex={active ? 0 : -1}
      className={tx(
        "flex w-full select-none items-center rounded-md px-2 py-1.5 outline-none transition-colors",
        disabled ? "text-fg-muted" : "active:bg-bg-subtle",
        className,
      )}
      {...getItemProps(rest)}
    >
      {children}
    </Component>
  );
};
