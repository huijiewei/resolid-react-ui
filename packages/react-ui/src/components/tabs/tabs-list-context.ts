import type { Dispatch, SetStateAction } from "react";
import { createSafeContext } from "../../primitives";

export type TabsListContextValue = {
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
};

export const [TabsListContext, useTabsList] = createSafeContext<TabsListContextValue>({ name: "TabsListContext" });
