import type { CSSProperties } from "react";
import { tx } from "../../utils";
import { ToastComponentContext, type ToastConfig, type ToastId, type ToastPlacement } from "./toast-context";

export type ToastRegionBaseProps = {
  /**
   * 默认放置位置
   * @default "bottom-end"
   */
  placement: ToastPlacement;

  /**
   * Toast 之间的间隔
   * @default "0.75rem"
   */
  spacing: string;

  /**
   * 同时可见的 Toast 数量
   * @default 5
   */
  visibleToasts: number;
};

export type ToastRegionProps = ToastRegionBaseProps & {
  toasts: ToastConfig[];
  remove: (id: ToastId) => void;
};

export const ToastRegion = ({ placement, spacing, visibleToasts, toasts, remove }: ToastRegionProps) => {
  return (
    <div
      role={"region"}
      aria-live={"polite"}
      style={{ "--sv": spacing } as CSSProperties}
      className={tx("z-60 m-(--sv) gap-(--sv) pointer-events-none fixed flex flex-col", getToastListStyles(placement))}
    >
      {toasts.slice(0, visibleToasts).map((toast) => {
        const ToastComponent = toast.component;

        return (
          <ToastComponentContext
            key={toast.id}
            value={{
              id: toast.id,
              placement: placement,
              duration: toast.duration,
              dismiss: toast.dismiss,
              update: toast.update,
              remove: () => remove(toast.id),
            }}
          >
            <ToastComponent />
          </ToastComponentContext>
        );
      })}
    </div>
  );
};

const getToastListStyles = (placement: ToastPlacement) => {
  const styles = [];

  if (placement.includes("top")) {
    styles.push("top-0");
  }

  if (placement.includes("bottom")) {
    styles.push("bottom-0");
  }

  if (!placement.includes("start")) {
    styles.push("right-0");
  }

  if (!placement.includes("end")) {
    styles.push("left-0");
  }

  return styles.join(" ");
};
