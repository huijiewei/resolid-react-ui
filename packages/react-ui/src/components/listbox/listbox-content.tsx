import type { JSX } from "react/jsx-runtime";
import { useMergeRefs } from "../../hooks";
import type { EmptyObject, PrimitiveProps } from "../../primitives";
import { usePopperFloating } from "../../primitives/popper/popper-floating-context";
import { inputTextShareStyles } from "../../shared/styles";
import { ariaAttr, tx } from "../../utils";
import { useListboxScroll } from "./listbox-scroll-context";
import { useListboxState } from "./listbox-state-context";

export const ListboxContent = (props: PrimitiveProps<"div", EmptyObject, "role" | "tabIndex">): JSX.Element => {
  const { children, className, ref, ...rest } = props;

  const { size, multiple } = useListboxState();
  const { scrollToRef, scrollRef } = useListboxScroll();
  const { setFloating, getFloatingProps } = usePopperFloating();

  const refs = useMergeRefs(ref, setFloating, scrollRef);

  return (
    <div
      ref={refs}
      tabIndex={scrollToRef.current ? -1 : undefined}
      className={tx(
        "scrollbar scrollbar-thin relative overflow-y-auto overscroll-contain outline-none",
        inputTextShareStyles[size],
        className,
      )}
      aria-multiselectable={ariaAttr(multiple)}
      {...(scrollToRef.current ? rest : getFloatingProps(rest))}
    >
      {children}
    </div>
  );
};
