import { useSyncExternalStore } from "react";
import { isBrowser } from "../../utils";
import { useIsomorphicEffect } from "../use-isomorphic-effect";

export type UseStorageInitialValue<Value> = (() => Value) | Value;

export type UseStorageOptions<Value> = {
  initialValue?: UseStorageInitialValue<Value>;
  storage?: Storage;
  deserializer?: (value: string) => Value;
  serializer?: (value: Value) => string;
};

const getStorageItem = (storage: Storage, key: string) => {
  const value = storage.getItem(key);

  if (!value) {
    return undefined;
  }

  return value;
};

const setStorageItem = (storage: Storage, key: string, value: string) => {
  const oldValue = storage.getItem(key);

  storage.setItem(key, value);

  window.dispatchEvent(new StorageEvent("storage", { key, oldValue, newValue: value, storageArea: storage }));
};

const removeStorageItem = (storage: Storage, key: string) => {
  const oldValue = storage.getItem(key);

  storage.removeItem(key);

  window.dispatchEvent(new StorageEvent("storage", { key, oldValue, newValue: null, storageArea: storage }));
};

const storageSubscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);

  return () => window.removeEventListener("storage", callback);
};

const getServerSnapshot = () => undefined;

export const useStorage = <Value>(key: string, params?: UseStorageInitialValue<Value> | UseStorageOptions<Value>) => {
  const options = (typeof params === "object" ? params : undefined) as UseStorageOptions<Value>;
  const initialValue = (options ? options?.initialValue : params) as UseStorageInitialValue<Value>;

  const serializer = (value: Value) => {
    if (options?.serializer) {
      return options.serializer(value);
    }

    return JSON.stringify(value);
  };

  const deserializer = (value: string) => {
    if (options?.deserializer) {
      return options.deserializer(value);
    }

    if (value === "undefined") {
      return undefined as unknown as Value;
    }

    try {
      return JSON.parse(value) as Value;
    } catch {
      return value as Value;
    }
  };

  const storage = options?.storage ?? window?.localStorage;

  const getSnapshot = () => getStorageItem(storage, key);
  const store = useSyncExternalStore(storageSubscribe, getSnapshot, getServerSnapshot);

  const set = (value: Value | ((previousValue: Value) => Value)) => {
    let nextValue: Value;

    if (value instanceof Function) {
      const parsedStore = store ? deserializer(store) : null;
      nextValue = value(parsedStore ?? (initialValue instanceof Function ? initialValue() : initialValue));
    } else {
      nextValue = value;
    }

    if (nextValue === undefined || nextValue === null) {
      return removeStorageItem(storage, key);
    }

    setStorageItem(storage, key, serializer(nextValue));
  };

  const remove = () => removeStorageItem(storage, key);

  useIsomorphicEffect(() => {
    const value = getStorageItem(storage, key);

    if (value === undefined && initialValue !== undefined) {
      setStorageItem(storage, key, serializer(initialValue instanceof Function ? initialValue() : initialValue));
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  if (!isBrowser) {
    return {
      value: initialValue instanceof Function ? initialValue() : initialValue,
      set,
      remove,
    };
  }

  return {
    value: store ? deserializer(store) : undefined,
    set,
    remove,
  };
};
