import { Composite } from "@floating-ui/react";
import { useState } from "react";
import type { EmptyObject, PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";
import { useTabs } from "./tabs-context";
import { TabsListContext } from "./tabs-list-context";

export const TabsList = (props: PrimitiveProps<"div", EmptyObject, "role">) => {
  const { children, className, ...rest } = props;

  const { orientation } = useTabs();

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Composite
      role={"tablist"}
      orientation={orientation}
      data-orientation={orientation}
      activeIndex={activeIndex}
      onNavigate={setActiveIndex}
      className={tx(
        "relative flex",
        orientation == "horizontal" ? "flex-row items-center" : "flex-col items-stretch",
        className,
      )}
      {...rest}
    >
      <TabsListContext value={{ activeIndex, setActiveIndex }}>{children}</TabsListContext>
    </Composite>
  );
};
