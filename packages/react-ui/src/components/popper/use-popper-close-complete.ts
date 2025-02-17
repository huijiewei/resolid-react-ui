import { useEffect } from "react";
import { usePrevious } from "../../hooks";
import type { PopperTransitionStatus } from "./popper-transtion-context";

export type UsePopperCloseCompleteOptions = {
  status: PopperTransitionStatus;
  onCloseComplete: () => void;
};

export const usePopperCloseComplete = ({ status, onCloseComplete }: UsePopperCloseCompleteOptions) => {
  const prevStatus = usePrevious(status);

  useEffect(() => {
    if (prevStatus == "close" && status == "unmounted") {
      onCloseComplete();
    }
  }, [onCloseComplete, prevStatus, status]);
};
