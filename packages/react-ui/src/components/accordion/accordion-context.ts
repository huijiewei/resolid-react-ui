import type { Dispatch, SetStateAction } from "react";
import { createSafeContext } from "../../primitives";
import type { Orientation } from "../../shared/types";

export type AccordionBaseProps = {
  /**
   * 方向
   * @default "horizontal"
   */
  orientation?: Orientation;

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;

  /**
   * 动画持续时间
   * @default 250
   */
  duration?: number;
};

export type AccordionContextValue = Required<AccordionBaseProps> & {
  collapsible: boolean;
  openedValue: string | number | null | (string | number)[];
  setOpenedValue: Dispatch<SetStateAction<string | number | null | (string | number)[]>>;
};

export const [AccordionContext, useAccordion] = createSafeContext<AccordionContextValue>({ name: "AccordionContext" });
