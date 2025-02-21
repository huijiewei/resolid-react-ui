import type { Dispatch, SetStateAction } from "react";
import { createSafeContext } from "../context";

export type CompositeContextValue = {
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
};

export const [CompositeContext, useComposite] = createSafeContext<CompositeContextValue>({ name: "CompositeContext" });
