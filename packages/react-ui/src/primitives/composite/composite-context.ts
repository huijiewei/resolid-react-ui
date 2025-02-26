import type { Dispatch, SetStateAction } from "react";
import { createSafeContext } from "../context";

export type CompositeContextValue = {
  activeIndex: number | undefined;
  setActiveIndex: Dispatch<SetStateAction<number | undefined>>;
};

export const [CompositeContext, useComposite] = createSafeContext<CompositeContextValue>({ name: "CompositeContext" });
