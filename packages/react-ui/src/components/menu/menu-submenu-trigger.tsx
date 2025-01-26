import { useMergeRefs } from "../../hooks";
import type { PolymorphicProps } from "../../primitives";
import { AngleRightIcon } from "../../shared/icons";
import { dataAttr, tx } from "../../utils";
import { usePopperReference } from "../popper/popper-reference-context";
import { MenuBaseItem, type MenuBaseItemProps } from "./menu-base-item";
import { useMenuHover } from "./menu-hover-context";

export type MenuSubmenuTriggerProps = MenuBaseItemProps;

export const MenuSubmenuTrigger = (props: PolymorphicProps<"div", MenuSubmenuTriggerProps, "role">) => {
  const { as, children, ref, className, disabled, ...rest } = props;

  const { open, setReference, getReferenceProps } = usePopperReference();
  const { setHoverEnabled } = useMenuHover();

  const refs = useMergeRefs(ref, setReference);

  return (
    <MenuBaseItem
      as={as}
      ref={refs}
      data-open={dataAttr(open)}
      className={tx("open:not-active:bg-bg-subtlest justify-between pe-0.5", className)}
      {...getReferenceProps({
        ...rest,
        onMouseEnter: () => {
          setHoverEnabled(true);
        },
      })}
    >
      {children}
      <span className={tx("ms-5", disabled ? "text-fg-subtle" : "text-fg-muted")}>
        <AngleRightIcon />
      </span>
    </MenuBaseItem>
  );
};
