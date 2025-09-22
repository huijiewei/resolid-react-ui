import type { Dispatch, SetStateAction } from "react";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type AccordionBaseProps = {
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

const desc = createSafeContext<AccordionContextValue>({ name: "AccordionContext" });

export const AccordionContext: SafeContext<AccordionContextValue> = desc[0];
export const useAccordion: UseSafeContext<AccordionContextValue> = desc[1];
