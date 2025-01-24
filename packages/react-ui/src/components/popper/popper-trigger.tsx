import type { ElementType } from "react";
import { useMergeRefs } from "../../hooks";
import type { PolymorphicProps } from "../../primitives";
import { dataAttr } from "../../utils";
import { usePopperReference } from "./popper-reference-context";

export type PopperTriggerProps<T extends ElementType> = PolymorphicProps<T, { active?: boolean }, "type">;

export const PopperTrigger = (props: PopperTriggerProps<"button">) => {
  const { as: Component = "button", active, children, ref, ...rest } = props;

  const { setReference, getReferenceProps, opened } = usePopperReference();

  const refs = useMergeRefs(setReference, ref);

  return (
    <Component
      ref={refs}
      data-active={dataAttr(active && opened)}
      type={Component == "button" ? "button" : undefined}
      {...getReferenceProps({
        ...rest,
      })}
    >
      {children}
    </Component>
  );
};
