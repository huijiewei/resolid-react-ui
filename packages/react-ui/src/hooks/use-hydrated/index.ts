import { noop } from "@resolid/utils";
import { useSyncExternalStore } from "react";

export const useHydrated = (): boolean => {
  return useSyncExternalStore(
    () => noop,
    () => true,
    () => false,
  );
};
