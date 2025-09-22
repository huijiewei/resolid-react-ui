import { FloatingPortal, type FloatingPortalProps } from "@floating-ui/react";
import type { JSX } from "react/jsx-runtime";

export type PortalProps = FloatingPortalProps;

export const Portal = (props: PortalProps): JSX.Element => {
  return <FloatingPortal {...props} />;
};
