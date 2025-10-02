import { useEffect, useEffectEvent } from "react";
import { usePrevious } from "../../hooks";
import type { PopperTransitionStatus } from "./popper-transtion-context";

export type UsePopperCloseCompleteOptions = {
  status: PopperTransitionStatus;
  onCloseComplete: () => void;
};

export const usePopperCloseComplete = ({ status, onCloseComplete }: UsePopperCloseCompleteOptions): void => {
  const prevStatus = usePrevious(status);

  const onCloseCompleteEvent = useEffectEvent(onCloseComplete);

  useEffect(() => {
    if (prevStatus == "close" && status == "unmounted") {
      onCloseCompleteEvent();
    }
  }, [prevStatus, status]);
};
