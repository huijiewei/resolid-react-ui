import type { PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";
import { getPanelId, getTabId, useTabs } from "./tabs-context";

export type TabsPanelProps = {
  /**
   * 将内容与触发器关联起来的唯一值
   */
  value: string;
};

export const TabsPanel = (
  props: PrimitiveProps<"div", TabsPanelProps, "id" | "tabIndex" | "role" | "aria-labelledby">,
) => {
  const { children, className, value, ...rest } = props;

  const { baseId, selectedValue, orientation } = useTabs();

  const tabId = getTabId(baseId, value);
  const panelId = getPanelId(baseId, value);
  const selected = value === selectedValue;

  if (!selected) {
    return null;
  }

  return (
    <div
      id={panelId}
      role="tabpanel"
      data-orientation={orientation}
      aria-labelledby={tabId}
      className={tx(selected ? "block" : "hidden", className)}
      {...rest}
    >
      {children}
    </div>
  );
};
