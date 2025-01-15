import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import { useLocalStorage } from "./index";

describe("useLocalStorage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test("initial state is in the returned state", () => {
    const { result } = renderHook(() => useLocalStorage("key", "value"));

    expect(result.current.value).toBe("value");
  });

  test("Initial state is a callback function", () => {
    const { result } = renderHook(() => useLocalStorage("key", () => "value"));

    expect(result.current.value).toBe("value");
  });

  test("Initial state is an array", () => {
    const { result } = renderHook(() => useLocalStorage("digits", [1, 2]));

    expect(result.current.value).toEqual([1, 2]);
  });

  test("Update the state", () => {
    const { result } = renderHook(() => useLocalStorage("key", "value"));

    act(() => {
      result.current.set("edited");
    });

    expect(result.current.value).toBe("edited");
  });

  test("Update the state writes localStorage", () => {
    const { result } = renderHook(() => useLocalStorage("key", "value"));

    act(() => {
      result.current.set("edited");
    });

    expect(window.localStorage.getItem("key")).toBe(JSON.stringify("edited"));
  });

  test("Update localStorage trigger event", () => {
    const { result } = renderHook(() => useLocalStorage("key", "value"));

    act(() => {
      window.localStorage.setItem("key", JSON.stringify("edited"));
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "key",
          oldValue: "value",
          newValue: "edited",
          storageArea: window.localStorage,
        }),
      );
    });

    expect(result.current.value).toBe("edited");
  });

  test("Update the state with undefined", () => {
    const { result } = renderHook(() => useLocalStorage<string | undefined>("key", "value"));

    act(() => {
      result.current.set(undefined);
    });

    expect(result.current.value).toBeUndefined();
  });

  test("Update the state with a callback function", () => {
    const { result } = renderHook(() => useLocalStorage("count", 2));

    act(() => {
      result.current.set((prev: number) => prev + 1);
    });

    expect(result.current.value).toBe(3);
    expect(window.localStorage.getItem("count")).toEqual("3");
  });
});
