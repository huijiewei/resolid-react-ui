import { type FloatingContext, useTransitionStatus, type UseTransitionStatusProps } from "@floating-ui/react";
import { useState } from "react";

export const useElementTransitionStatus = <E extends HTMLElement = HTMLElement>(
  open: boolean,
  props?: UseTransitionStatusProps,
) => {
  const [elementState, setElementState] = useState<E | null>(null);

  const setElement = (node: E | null) => {
    setElementState(node);
  };

  const { isMounted, status } = useTransitionStatus(
    {
      open,
      elements: { floating: elementState, reference: null, domReference: null },
    } as unknown as FloatingContext,
    props,
  );

  return { isMounted, status, setElement };
};
