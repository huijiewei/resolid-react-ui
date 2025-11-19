import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";

export type AvatarIndicatorProps = {
  /**
   * 指示器相对于头像的位置
   * @default "top"
   */
  position?: "top" | "bottom";
};

export const AvatarIndicator = (
  props: PrimitiveProps<"div", AvatarIndicatorProps>,
): JSX.Element => {
  const { position = "top", className, children, ...rest } = props;
  return (
    <div
      className={tx(
        "absolute right-0 flex translate-x-1/10 items-center justify-center",
        position == "top" ? "top-0 -translate-y-1/10" : "bottom-0 translate-y-1/10",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
