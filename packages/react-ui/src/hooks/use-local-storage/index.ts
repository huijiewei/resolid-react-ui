import { type SetStateAction, useSyncExternalStore } from "react";
import { useIsomorphicEffect } from "../use-isomorphic-effect";

const getLocalStorageItem = (key: string) => {
  return window.localStorage.getItem(key) ?? undefined;
};

const setLocalStorageItem = (key: string, value: string | undefined) => {
  const oldValue = getLocalStorageItem(key);

  if (value == undefined) {
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
  const initialResolved = typeof initialValue === "function" ? (initialValue as () => T)() : initialValue;

  const getSnapshot = () => getLocalStorageItem(key);
  const getServerSnapshot = () => JSON.stringify(initialResolved);

  const store = useSyncExternalStore(localStorageSubscribe, getSnapshot, getServerSnapshot);

  const setValue = (value: SetStateAction<T>) => {
    const nextValue =
      typeof value === "function"
        ? (value as (prevState?: T) => T)(store ? JSON.parse(store) : initialResolved)
        : value;

    setLocalStorageItem(key, nextValue !== undefined ? JSON.stringify(nextValue) : undefined);
  };

  useIsomorphicEffect(() => {
    if (getLocalStorageItem(key) == undefined && initialResolved != undefined) {
      setLocalStorageItem(key, JSON.stringify(initialResolved));
    }
  }, [key, initialResolved]);

  return [store != undefined ? (JSON.parse(store) as T) : store, setValue] as const;
};
