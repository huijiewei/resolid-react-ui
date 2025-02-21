import type { ComponentProps } from "react";
import { PopperBackdrop } from "../../primitives/popper/popper-backdrop";
import { PopperClose } from "../../primitives/popper/popper-close";
import { PopperDescrition } from "../../primitives/popper/popper-description";
import { PopperPortal } from "../../primitives/popper/popper-portal";
import { PopperTitle } from "../../primitives/popper/popper-title";
import { PopperTrigger } from "../../primitives/popper/popper-trigger";
import { DrawerRoot, type DrawerRootProps } from "./drawer-root";

export type DrawerProps = DrawerRootProps;

export const Drawer = DrawerRoot;

export const DrawerTrigger = (props: Omit<ComponentProps<typeof PopperTrigger>, "active">) => {
  return <PopperTrigger active={false} {...props} />;
};

export const DrawerPortal = PopperPortal;

export const DrawerBackdrop = PopperBackdrop;

export { DrawerContent } from "./drawer-content";

export const DrawerTitle = PopperTitle;
export const DrawerDescription = PopperDescrition;
export const DrawerClose = PopperClose;
