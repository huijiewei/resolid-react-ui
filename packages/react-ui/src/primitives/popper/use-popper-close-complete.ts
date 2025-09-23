import { useEffect } from "react";
import { useEffectEvent, usePrevious } from "../../hooks";
import type { PopperTransitionStatus } from "./popper-transtion-context";

export type UsePopperCloseCompleteOptions = {
  status: PopperTransitionStatus;
  onCloseComplete: () => void;
};

export const usePopperCloseComplete = ({ status, onCloseComplete }: UsePopperCloseCompleteOptions): void => {
  const prevStatus = usePrevious(status);

  const handleCloseComplete = useEffectEvent(onCloseComplete);

  useEffect(() => {
    if (prevStatus == "close" && status == "unmounted") {
      handleCloseComplete();
    }
  }, [prevStatus, status]);
};
