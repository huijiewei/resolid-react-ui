import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { useDisclosure } from "./index";

describe("useDisclosure", () => {
  test("handles close correctly", () => {
    const { result } = renderHook(() => useDisclosure({ defaultOpen: true }));

    const [open, { handleClose }] = result.current;
    expect(open).toBe(true);

    act(handleClose);

    const [next] = result.current;

    expect(next).toBe(false);
  });

  test("handles open correctly", () => {
    const { result } = renderHook(() => useDisclosure({ defaultOpen: false }));

    const [open, { handleOpen }] = result.current;
    expect(open).toBe(false);

    act(handleOpen);

    const [next] = result.current;
    expect(next).toBe(true);
  });

  test("handles toggle correctly", () => {
    const { result } = renderHook(() => useDisclosure({ defaultOpen: false }));

    const [open, { handleToggle }] = result.current;
    expect(open).toBe(false);

    act(handleToggle);

    const [next] = result.current;
    expect(next).toBe(true);

    act(() => {
      const [, { handleToggle }] = result.current;
      handleToggle();
    });

    const [last] = result.current;
    expect(last).toBe(false);
  });

  test("calls onClose when close is called", () => {
    const onOpenChange = vi.fn();

    const { result } = renderHook(() => useDisclosure({ defaultOpen: true, onOpenChange }));
    expect(onOpenChange).toHaveBeenCalledTimes(0);

    act(() => {
      const [, { handleClose }] = result.current;
      handleClose();
    });

    expect(onOpenChange).toHaveBeenCalledTimes(1);

    act(() => {
      const [, { handleClose }] = result.current;
      handleClose();
    });

    expect(onOpenChange).toHaveBeenCalledTimes(1);
  });

  test("calls onOpen when open is called", () => {
    const onOpenChange = vi.fn();

    const { result } = renderHook(() => useDisclosure({ defaultOpen: false, onOpenChange }));
    expect(onOpenChange).toHaveBeenCalledTimes(0);

    act(() => {
      const [, { handleOpen }] = result.current;
      handleOpen();
    });

    expect(onOpenChange).toHaveBeenCalledTimes(1);

    act(() => {
      const [, { handleOpen }] = result.current;
      handleOpen();
    });

    expect(onOpenChange).toHaveBeenCalledTimes(1);
  });

  test("calls onOpen and onClose correctly when toggle is called", () => {
    const onOpenChange = vi.fn();
    const { result } = renderHook(() => useDisclosure({ defaultOpen: false, onOpenChange }));
    expect(onOpenChange).toHaveBeenCalledTimes(0);

    act(() => {
      const [, { handleToggle }] = result.current;
      handleToggle();
    });
    expect(onOpenChange).toHaveBeenCalledTimes(1);

    act(() => {
      const [, { handleToggle }] = result.current;
      handleToggle();
    });
    expect(onOpenChange).toHaveBeenCalledTimes(2);

    act(() => {
      const [, { handleToggle }] = result.current;
      handleToggle();
    });
    expect(onOpenChange).toHaveBeenCalledTimes(3);
  });
});
