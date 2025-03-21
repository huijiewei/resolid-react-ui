import { useEffect, useState } from "react";
import { useEffectEvent, useElementTransitionStatus, useEventListener, usePrevious, useTimeout } from "../../hooks";
import type { PrimitiveProps } from "../../primitives";
import { PopperAriaContext } from "../../primitives/popper/popper-aria-context";
import { PopperDispatchContext } from "../../primitives/popper/popper-dispatch-context";
import { getPopperAnimationProps } from "../../primitives/popper/utils";
import { tx } from "../../utils";
import { Alert, type AlertProps } from "../alert/alert";
import { useToastComponent } from "./toast-context";

export type ToastRootProps = AlertProps & {
  /**
   * 控制 Toast 的优先权以实现可访问性。对于用户操作结果的请选择 `high`。从后台任务生成的应使用 `low`。
   * @default "high"
   */
  priority?: "high" | "low";

  /**
   * onDismiss 回调
   */
  onDismiss?: () => void;
};

export const ToastRoot = (props: PrimitiveProps<"div", ToastRootProps, "role" | "id">) => {
  const {
    priority = "high",
    onDismiss,
    color = "primary",
    variant = "soft",
    children,
    className,
    style,
    ...rest
  } = props;

  const { id, duration, placement, dismiss, update, remove } = useToastComponent();

  const [openState, setOpenState] = useState(true);
  const [transitionEnable, setTransitionEnable] = useState(!update);

  const { isMounted, status, setElement } = useElementTransitionStatus(openState, { duration: 300 });

  const handleDismiss = () => {
    setTransitionEnable(true);
    setOpenState(false);
    onDismiss?.();
  };

  const handleDismissRef = useEffectEvent(handleDismiss);

  useEffect(() => {
    if (dismiss) {
      handleDismissRef();
    }
  }, [dismiss]);

  const prevStatus = usePrevious(status);

  useEffect(() => {
    if (prevStatus == "close" && status == "unmounted") {
      remove();
    }
  }, [prevStatus, remove, status]);

  const { reset, clear } = useTimeout(handleDismiss, duration);

  useEventListener("blur", clear);
  useEventListener("focus", reset);

  if (!isMounted) {
    return null;
  }

  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;

  const ariaContext = {
    labelId,
    descriptionId,
  };

  const translateStyle = placementTranslateStyles[placement?.split("-")[0] as keyof typeof placementTranslateStyles];

  const animationProps = getPopperAnimationProps({
    status,
    duration: 300,
    transitionClassName: "transition-[opacity,translate]",
    defaultClassName: ["opacity-0", translateStyle.close],
    openClassName: ["opacity-100", translateStyle.open],
  });

  return (
    <div
      role="status"
      aria-live={priority == "high" ? "assertive" : "polite"}
      aria-atomic="true"
      ref={setElement}
      style={{ ...style, ...animationProps.style }}
      className={tx("flex flex-col items-center", transitionEnable && animationProps.className)}
      onFocus={clear}
      onBlur={reset}
      onMouseOver={clear}
      onMouseLeave={reset}
      {...rest}
    >
      <Alert
        className={tx("max-w-128 pointer-events-auto relative w-auto min-w-80 pe-8 shadow-md", className)}
        color={color}
        variant={variant}
        aria-labelledby={labelId}
        aria-describedby={descriptionId}
      >
        <PopperAriaContext value={ariaContext}>
          <PopperDispatchContext value={{ handleClose: handleDismiss }}>{children}</PopperDispatchContext>
        </PopperAriaContext>
      </Alert>
    </div>
  );
};

const placementTranslateStyles = {
  top: {
    open: "",
    close: "-translate-y-1/2",
  },
  bottom: {
    open: "",
    close: "translate-y-1/2",
  },
};
