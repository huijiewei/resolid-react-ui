import { type CSSProperties, useEffect, useEffectEvent, useRef, useState } from "react";
import type { JSX } from "react/jsx-runtime";
import { useResizeObserver } from "../../hooks";
import type { Orientation } from "../../shared/types";
import { tx } from "../../utils";
import type { PrimitiveProps } from "../polymorphic";
import { useIndicator } from "./indicator-context";

export type IndicatorProps = {
  orientation: Orientation;
};

export const Indicator = (props: PrimitiveProps<"span", IndicatorProps, "role" | "children">): JSX.Element => {
  const { orientation, className, style, ...rest } = props;

  const [indicatorStyle, setIndicatorStyle] = useState<CSSProperties>();

  const { listRef, activeIndex } = useIndicator();
  const activeRef = useRef<HTMLElement | undefined>(null);

  const computeStyle = () => {
    activeRef.current = listRef.current?.querySelector<HTMLElement>("[data-active]");

    if (!activeRef.current) {
      return;
    }

    const style = getComputedStyle(listRef.current!);

    setIndicatorStyle({
      "--wv": activeRef.current.offsetWidth + "px",
      "--hv": activeRef.current.offsetHeight + "px",
      "--tv":
        orientation == "vertical"
          ? `${activeRef.current.offsetTop - parseFloat(style.paddingTop)}px`
          : `${activeRef.current.offsetLeft - parseFloat(style.paddingLeft)}px`,
    } as CSSProperties);
  };

  const computeStyleEvent = useEffectEvent(computeStyle);

  useEffect(() => {
    computeStyleEvent();
  }, [activeIndex]);

  useResizeObserver(listRef, computeStyle);

  return (
    <span
      role={"presentation"}
      style={{
        ...style,
        ...indicatorStyle,
      }}
      className={tx(
        "absolute transition-[width,height,translate] duration-200",
        orientation == "vertical" ? "translate-y-(--tv)" : "translate-x-(--tv)",
        className,
      )}
      {...rest}
    />
  );
};
