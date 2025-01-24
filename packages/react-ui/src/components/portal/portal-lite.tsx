import { useFloatingPortalNode } from "@floating-ui/react";
import type { ReactNode, RefObject } from "react";
import { createPortal } from "react-dom";

export type PortalLiteProps = {
  id?: string;
  root?: HTMLElement | null | RefObject<HTMLElement | null>;
  children?: ReactNode;
};

export const PortalLite = ({ children, root, id = "resolid-portal-lite" }: PortalLiteProps) => {
  const node = useFloatingPortalNode({ root, id });

  if (node) {
    return createPortal(children, node);
  }

  return null;
};
