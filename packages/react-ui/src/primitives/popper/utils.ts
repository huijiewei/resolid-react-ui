import type { CSSProperties } from "react";
import { tx } from "../../utils";
import type { PopperTransitionStatus } from "./popper-transtion-context";

export type PopperFocusProps = {
  /**
   * 开启后焦点目标
   */
  initialFocus?: number | RefObject<HTMLElement | null>;

  /**
   * 关闭后焦点目标
   */
  finalFocus?: boolean | RefObject<HTMLElement | null>;
};

export type PopperAnimationProps = {
  status: PopperTransitionStatus;
  duration: number;
  transitionClassName?: string | string[];
  openClassName?: string | string[];
  defaultClassName?: string | string[];
};

export const getPopperAnimationProps = (
  props: PopperAnimationProps,
): {
  style: CSSProperties;
  className: string | undefined;
} => {
  const {
    status,
    duration,
    transitionClassName = "transition-opacity",
    openClassName = "opacity-100",
    defaultClassName = "opacity-0",
  } = props;

  return {
    style: {
      "--dv": `${duration}ms`,
    } as CSSProperties,
    className: tx(
      "duration-(--dv)",
      transitionClassName,
      status == "open" ? openClassName : defaultClassName,
    ),
  };
};
