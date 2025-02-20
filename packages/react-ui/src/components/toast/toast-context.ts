import type { Alignment } from "@floating-ui/react";
import type { ReactElement } from "react";
import { createSafeContext } from "../../primitives";

export type ToastId = string | number;

export type ToastPlacement = "top" | "bottom" | `top-${Alignment}` | `bottom-${Alignment}`;

export type ToastOptions = {
  id?: ToastId;

  /**
   * 自动关闭延时, 覆盖 `ResolidProvider` 提供的值
   */
  duration?: number | null;

  /**
   * 显示位置
   */
  placement?: ToastPlacement;
};

type ToastBaseProps = Required<ToastOptions> & {
  update: boolean;
  dismiss: boolean;
};

export type ToastComponentContextValue = ToastBaseProps & {
  remove: () => void;
};

export const [ToastComponentContext, useToastComponent] = createSafeContext<ToastComponentContextValue>({
  name: "ToastComponentContext",
});

export type ToastConfig = ToastBaseProps & {
  component: () => ReactElement;
};

export type ToastPromiseState = "pending" | "success" | "failure";

export type ToastPromiseComponentProps<T, E> = {
  state: ToastPromiseState;
  data?: T;
  error?: E;
};

export type ToastContextValue = {
  show: (component: ReactElement, options?: ToastOptions) => ToastId;
  update: (id: ToastId, component: ReactElement) => void;
  dismiss: (id: ToastId) => void;
  showPromise: <T = unknown, E extends Error = Error>(
    promise: Promise<T> | (() => Promise<T>),
    component: (props: ToastPromiseComponentProps<T, E>) => ReactElement,
    options?: ToastOptions,
  ) => ToastId;
  clearAll: (...args: ToastPlacement[]) => void;
};

export const [ToastContext, useToast] = createSafeContext<ToastContextValue>({
  name: "ToastContext",
});
