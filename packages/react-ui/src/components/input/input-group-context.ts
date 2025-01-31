import { createSafeContext } from "../../primitives";
import type { InputSize } from "./input.styles";

export type InputGroupContextValue = {
  /**
   * 大小
   * @default "md"
   */
  size: InputSize;
};

export const [InputGroupContext, useInputGroup] = createSafeContext<InputGroupContextValue, boolean>({
  strict: false,
  name: "InputGroupContext",
});
