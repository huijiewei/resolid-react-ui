import { Composite } from "@floating-ui/react";
import { useState, type KeyboardEvent } from "react";
import { useControllableState } from "../../hooks";
import type { PrimitiveProps } from "../../primitives";
import { CompositeContext, type CompositeContextValue } from "../../primitives/composite/composite-context";
import { tx } from "../../utils";
import { AccordionContext, type AccordionBaseProps, type AccordionContextValue } from "./accordion-context";

type AccordionSingleProps = {
  /**
   * 同时打开多个项目
   */
  multiple: false;

  /**
   * 受控值
   */
  value?: string | number | null;

  /**
   * 默认值
   */
  defaultValue?: string | number | null;

  /**
   * onChange 回调
   */
  onChange?: (value: string | number | null) => void;

  /**
   * 允许关闭内容, 当 `multiple` 为 `false` 时有效
   * @default false
   */
  collapsible?: boolean;
};

type AccordionMultipleProps = {
  /**
   * 同时打开多个项目
   * @default true
   */
  multiple?: true;

  collapsible?: never;

  /**
   * 受控值
   */
  value?: (string | number)[];

  /**
   * 默认值
   */
  defaultValue?: (string | number)[];

  /**
   * onChange 回调
   */
  onChange?: (value: (string | number)[]) => void;
};

export type AccordionRootProps = (AccordionMultipleProps | AccordionSingleProps) & AccordionBaseProps;

export const AccordionRoot = (props: PrimitiveProps<"div", AccordionRootProps>) => {
  const {
    value,
    multiple = true,
    defaultValue = multiple ? [] : null,
    onChange,
    collapsible = false,
    orientation = "vertical",
    disabled = false,
    duration = 250,
    className,
    children,
    onKeyDown,
    ...rest
  } = props;

  const [valueState, setValueState] = useControllableState<(string | number)[] | string | number | null>({
    value,
    defaultValue,
    onChange: onChange as (value: (string | number)[] | string | number | null) => void,
  });

  const [activeIndex, setActiveIndex] = useState(0);

  const context: AccordionContextValue = {
    orientation,
    disabled,
    duration,
    collapsible,
    openedValue: valueState,
    setOpenedValue: setValueState,
  };

  const compositeContext: CompositeContextValue = {
    activeIndex,
    setActiveIndex,
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);

    if (e.key === "Tab") {
      e.preventDefault();

      const changeTo = orientation == "horizontal" ? "ArrowLeft" : "ArrowDown";

      const newEvent = new KeyboardEvent("keydown", {
        key: changeTo,
        code: changeTo,
        bubbles: true,
      });

      e.target.dispatchEvent(newEvent);
    }
  };

  return (
    <Composite
      orientation={orientation}
      activeIndex={activeIndex}
      onNavigate={setActiveIndex}
      className={tx("flex", orientation == "horizontal" ? "flex-row" : "flex-col", className)}
      onKeyDown={handleKeyDown}
      render={(props) => <div {...props} aria-orientation={undefined} />}
      {...rest}
    >
      <AccordionContext value={context}>
        <CompositeContext value={compositeContext}>{children}</CompositeContext>
      </AccordionContext>
    </Composite>
  );
};
