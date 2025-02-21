import { createSafeContext } from "../../primitives";

export type DrawerPlacement = "start" | "end" | "bottom" | "top";

export type DrawerContextValue = {
  /**
   * 放置位置
   * @default 'right'
   */
  placement: DrawerPlacement;
};

export const [DrawerContext, useDrawer] = createSafeContext<DrawerContextValue>({
  name: "DrawerContext",
});
