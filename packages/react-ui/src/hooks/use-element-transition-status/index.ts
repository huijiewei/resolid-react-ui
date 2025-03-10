import { type FloatingContext, useTransitionStatus, type UseTransitionStatusProps } from "@floating-ui/react";
import { useState } from "react";

export const useElementTransitionStatus = <E extends HTMLElement = HTMLElement>(
  open: boolean,
  props?: UseTransitionStatusProps,
) => {
  const [element, setElement] = useState<E | null>(null);

  const { isMounted, status } = useTransitionStatus(
    {
      open,
      elements: { floating: element, reference: null, domReference: null },
    } as unknown as FloatingContext,
    props,
  );

  return { isMounted, status, element, setElement };
};
