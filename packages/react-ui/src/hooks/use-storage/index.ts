import { type SetStateAction, useSyncExternalStore } from "react";
import { useIsomorphicEffect } from "../use-isomorphic-effect";

export type UseStorageInitialValue<Value> = (() => Value) | Value;

export type UseStorageOptions<Value> = {
  initialValue?: UseStorageInitialValue<Value>;
  storage?: Storage;
  deserializer?: (value: string) => Value;
  serializer?: (value: Value) => string;
};

const getStorageItem = (storage: Storage | undefined, key: string) => {
  if (storage == undefined) {
    return undefined;
  }

  try {
    const value = storage.getItem(key);
    return value ?? undefined;
  } catch (error) {
    console.warn(`Failed to get storage item for key "${key}":`, error);
    return undefined;
  }
};

const setStorageItem = (storage: Storage | undefined, key: string, value: string) => {
  if (storage == undefined) {
    return;
  }

  try {
    const oldValue = storage.getItem(key);
    storage.setItem(key, value);

    window.dispatchEvent(
      new StorageEvent("storage", {
        key,
        oldValue,
        newValue: value,
        storageArea: storage,
      }),
    );
  } catch (error) {
    console.warn(`Failed to set storage item for key "${key}":`, error);
  }
};

const removeStorageItem = (storage: Storage | undefined, key: string) => {
  if (storage == undefined) {
    return;
  }

  const oldValue = storage.getItem(key);

  storage.removeItem(key);

  window.dispatchEvent(new StorageEvent("storage", { key, oldValue, newValue: null, storageArea: storage }));
};

const storageSubscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);

  return () => window.removeEventListener("storage", callback);
};

export const useStorage = <Value>(
  key: string,
  params?: UseStorageInitialValue<Value> | UseStorageOptions<Value>,
): {
  value: Value | undefined;
  setValue: (value: SetStateAction<Value>) => void;
  remove: () => void;
} => {
  const options = (typeof params === "object" ? params : undefined) as UseStorageOptions<Value>;
  const initialValue = (options ? options?.initialValue : params) as UseStorageInitialValue<Value>;
  const initialValueResolved = typeof initialValue === "function" ? (initialValue as () => Value)() : initialValue;

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

  const storage = options?.storage;

  const getSnapshot = () => getStorageItem(storage, key);
  const getServerSnapshot = () => serializer(initialValueResolved);
  const store = useSyncExternalStore(storageSubscribe, getSnapshot, getServerSnapshot);

  const setValue = (value: SetStateAction<Value>) => {
    let nextValue: Value;

    if (typeof value === "function") {
      const parsedStore = store ? deserializer(store) : null;
      nextValue = (value as (prev: Value) => Value)(parsedStore ?? initialValueResolved);
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
      setStorageItem(storage, key, serializer(initialValueResolved));
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return {
    value: store ? deserializer(store) : undefined,
    setValue,
    remove,
  };
};
