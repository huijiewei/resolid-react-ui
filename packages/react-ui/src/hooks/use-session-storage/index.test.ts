import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import { useSessionStorage } from "./index";

describe("useSessionStorage", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  test("initial state is in the returned state", () => {
    const { result } = renderHook(() => useSessionStorage("key", "value"));

    expect(result.current.value).toBe("value");
  });

  test("Initial state is a callback function", () => {
    const { result } = renderHook(() => useSessionStorage("key", () => "value"));

    expect(result.current.value).toBe("value");
  });

  test("Initial state is an array", () => {
    const { result } = renderHook(() => useSessionStorage("digits", [1, 2]));

    expect(result.current.value).toEqual([1, 2]);
  });

  test("Update the state", () => {
    const { result } = renderHook(() => useSessionStorage("key", "value"));

    act(() => {
      result.current.setValue("edited");
    });

    expect(result.current.value).toBe("edited");
  });

  test("Update the state writes sessionStorage", () => {
    const { result } = renderHook(() => useSessionStorage("key", "value"));

    act(() => {
      result.current.setValue("edited");
    });

    expect(window.sessionStorage.getItem("key")).toBe(JSON.stringify("edited"));
  });

  test("Update sessionStorage trigger event", () => {
    const { result } = renderHook(() => useSessionStorage("key", "value"));

    act(() => {
      window.sessionStorage.setItem("key", JSON.stringify("edited"));
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "key",
          oldValue: "value",
          newValue: "edited",
          storageArea: window.sessionStorage,
        }),
      );
    });

    expect(result.current.value).toBe("edited");
  });

  test("Update the state with undefined", () => {
    const { result } = renderHook(() => useSessionStorage<string | undefined>("key", "value"));

    act(() => {
      result.current.setValue(undefined);
    });

    expect(result.current.value).toBeUndefined();
  });

  test("Update the state with a callback function", () => {
    const { result } = renderHook(() => useSessionStorage("count", 2));

    act(() => {
      result.current.setValue((prev: number) => prev + 1);
    });

    expect(result.current.value).toBe(3);
    expect(window.sessionStorage.getItem("count")).toEqual("3");
  });
});
