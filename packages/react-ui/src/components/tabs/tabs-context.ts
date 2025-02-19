import { createSafeContext } from "../../primitives";
import type { Orientation } from "../../shared/types";

export type TabsContextValue = {
  baseId: string;
  selectedValue?: string;
  setSelectedValue: (value: string) => void;
  orientation: Orientation;
};

export const [TabsContext, useTabs] = createSafeContext<TabsContextValue>({
  name: "TabsContext",
});

export const getTabId = (baseId: string, value: string) => `${baseId}-t-${value}`;

export const getPanelId = (baseId: string, value: string) => `${baseId}-p-${value}`;
