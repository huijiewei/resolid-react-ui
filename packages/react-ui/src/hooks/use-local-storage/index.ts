import { isFunction, isUndefined, runIf } from "@resolid/utils";
import { type SetStateAction, useSyncExternalStore } from "react";
import { useIsomorphicEffect } from "../use-isomorphic-effect";

const getLocalStorageItem = (key: string) => {
  return window.localStorage.getItem(key) ?? undefined;
};

const setLocalStorageItem = (key: string, value: string | undefined) => {
  const oldValue = getLocalStorageItem(key);

  if (isUndefined(value)) {
    window.localStorage.removeItem(key);
  } else {
    window.localStorage.setItem(key, value);
  }

  window.dispatchEvent(
    new StorageEvent("storage", { key, oldValue, newValue: value, storageArea: window.localStorage }),
  );
};

const localStorageSubscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);

  return () => window.removeEventListener("storage", callback);
};

export const useLocalStorage = <T>(key: string, initialValue?: (() => T) | T) => {
  const initialResolved = isFunction(initialValue) ? initialValue() : initialValue;

  const getSnapshot = () => getLocalStorageItem(key);
  const getServerSnapshot = () => JSON.stringify(initialResolved);

  const store = useSyncExternalStore(localStorageSubscribe, getSnapshot, getServerSnapshot);

  const setValue = (value: SetStateAction<T>) => {
    const nextValue = runIf(value, store ? JSON.parse(store) : initialResolved);

    setLocalStorageItem(key, !isUndefined(nextValue) ? JSON.stringify(nextValue) : undefined);
  };

  useIsomorphicEffect(() => {
    if (isUndefined(getLocalStorageItem(key)) && !isUndefined(initialResolved)) {
      setLocalStorageItem(key, JSON.stringify(initialResolved));
    }
  }, [key, initialResolved]);

  return [!isUndefined(store) ? (JSON.parse(store) as T) : store, setValue] as const;
};
