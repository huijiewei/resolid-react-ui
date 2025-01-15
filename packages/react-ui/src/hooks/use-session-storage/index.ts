import { useStorage, type UseStorageInitialValue, type UseStorageOptions } from "../use-storage";

export const useSessionStorage = <Value>(
  key: string,
  initialValue?: UseStorageInitialValue<Value>,
  options?: UseStorageOptions<Value>,
) => useStorage(key, { initialValue, storage: window.sessionStorage, ...options });
