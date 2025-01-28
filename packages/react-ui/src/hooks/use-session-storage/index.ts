import { isBrowser } from "../../utils";
import { useStorage, type UseStorageInitialValue, type UseStorageOptions } from "../use-storage";

export const useSessionStorage = <Value>(
  key: string,
  initialValue?: UseStorageInitialValue<Value>,
  options?: UseStorageOptions<Value>,
) => useStorage<Value>(key, { initialValue, storage: isBrowser ? window.sessionStorage : undefined, ...options });
