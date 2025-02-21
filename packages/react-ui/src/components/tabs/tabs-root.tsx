import { useId } from "react";
import { useControllableState } from "../../hooks";
import type { PrimitiveProps } from "../../primitives";
import type { Orientation } from "../../shared/types";
import { tx } from "../../utils";
import { TabsContext, type TabsContextValue } from "./tabs-context";

export type TabsRootProps = {
  /**
   * 受控值
   */
  value?: string;

  /**
   * 默认值
   */
  defaultValue: string;

  /**
   * onChange 回调
   */
  onChange?: (value: string) => void;

  /**
   * 方向
   * @default "horizontal"
   */
  orientation?: Orientation;
};

export const TabsRoot = (props: PrimitiveProps<"div", TabsRootProps, "id">) => {
  const { children, className, value, defaultValue, onChange, orientation = "horizontal", ...rest } = props;

  const [valueState, setValueState] = useControllableState({ value, defaultValue, onChange });

  const baseId = useId();

  const context: TabsContextValue = {
    baseId,
    selectedValue: valueState,
    setSelectedValue: setValueState,
    orientation,
  };

  return (
    <div className={tx("flex", orientation == "horizontal" ? "flex-col" : "flex-row", className)} {...rest}>
      <TabsContext value={context}>{children}</TabsContext>
    </div>
  );
};
