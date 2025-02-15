import type { ReactNode } from "react";
import { createSafeContext } from "../../primitives";

export type BreadcrumbContextValue = {
  /**
   * 每个面包屑项目之间的视觉分隔符
   * @default <SlashIcon>
   */
  separator?: ReactNode;
};

export const [BreadcrumbContext, useBreadcrumb] = createSafeContext<BreadcrumbContextValue>({
  name: "BreadcrumbContext",
});
