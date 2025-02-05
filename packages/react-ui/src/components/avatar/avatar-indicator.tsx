import type { PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";

export type AvatarIndicatorProps = {
  /**
   * 指示器相对于头像的位置
   * @default "top"
   */
  position?: "top" | "bottom";
};

export const AvatarIndicator = (props: PrimitiveProps<"div", AvatarIndicatorProps>) => {
  const { position = "top", className, children, ...rest } = props;
  return (
    <div
      className={tx(
        "translate-x-1/10 absolute right-0 flex items-center justify-center",
        position == "top" ? "-translate-y-1/10 top-0" : "translate-y-1/10 bottom-0",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
