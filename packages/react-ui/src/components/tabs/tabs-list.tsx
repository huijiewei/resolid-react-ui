import { Composite } from "@floating-ui/react";
import { useRef, useState } from "react";
import type { JSX } from "react/jsx-runtime";
import { useMergeRefs } from "../../hooks";
import type { EmptyObject, PrimitiveProps } from "../../primitives";
import { CompositeContext } from "../../primitives/composite/composite-context";
import { useOrientation } from "../../primitives/composite/orientation-context";
import { IndicatorContext } from "../../primitives/indicator/indicator-context";
import { tx } from "../../utils";

export const TabsList = (props: PrimitiveProps<"div", EmptyObject, "role">): JSX.Element => {
  const { children, className, ref, ...rest } = props;

  const orientation = useOrientation();

  const listRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | undefined>(0);

  const refs = useMergeRefs(ref, listRef);

  return (
    <Composite
      ref={refs}
      role={"tablist"}
      orientation={orientation}
      activeIndex={activeIndex}
      onNavigate={setActiveIndex}
      className={tx(
        "relative flex",
        orientation == "horizontal" ? "flex-row items-center" : "flex-col items-stretch",
        className,
      )}
      {...rest}
    >
      <IndicatorContext value={{ listRef, activeIndex }}>
        <CompositeContext value={{ activeIndex, setActiveIndex }}>{children}</CompositeContext>
      </IndicatorContext>
    </Composite>
  );
};
