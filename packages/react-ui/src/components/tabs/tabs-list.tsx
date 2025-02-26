import { Composite } from "@floating-ui/react";
import { useState } from "react";
import type { EmptyObject, PrimitiveProps } from "../../primitives";
import { CompositeContext, type CompositeContextValue } from "../../primitives/composite/composite-context";
import { tx } from "../../utils";
import { useTabs } from "./tabs-context";

export const TabsList = (props: PrimitiveProps<"div", EmptyObject, "role">) => {
  const { children, className, ...rest } = props;

  const { orientation } = useTabs();

  const [activeIndex, setActiveIndex] = useState<number | undefined>(0);

  const context: CompositeContextValue = {
    activeIndex,
    setActiveIndex,
  };

  return (
    <Composite
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
      <CompositeContext value={context}>{children}</CompositeContext>
    </Composite>
  );
};
