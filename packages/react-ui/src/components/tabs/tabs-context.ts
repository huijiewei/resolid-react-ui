import { createSafeContext } from "../../primitives";

export type TabsContextValue = {
  baseId: string;
  selectedValue?: string;
  setSelectedValue: (value: string) => void;
};

export const [TabsContext, useTabs] = createSafeContext<TabsContextValue>({
  name: "TabsContext",
});

export const getTabId = (baseId: string, value: string) => `${baseId}-t-${value}`;

export const getPanelId = (baseId: string, value: string) => `${baseId}-p-${value}`;
