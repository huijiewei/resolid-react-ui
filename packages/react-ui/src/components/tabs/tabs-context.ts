import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type TabsContextValue = {
  baseId: string;
  selectedValue?: string;
  setSelectedValue: (value: string) => void;
};

const dest = createSafeContext<TabsContextValue>({
  name: "TabsContext",
});

export const TabsContext: SafeContext<TabsContextValue> = dest[0];
export const useTabs: UseSafeContext<TabsContextValue> = dest[1];

export const getTabId = (baseId: string, value: string) => `${baseId}-t-${value}`;

export const getPanelId = (baseId: string, value: string) => `${baseId}-p-${value}`;
