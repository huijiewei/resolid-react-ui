import type { PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";
import { Button } from "../button/button";
import type { ButtonStyleProps } from "../button/button.styles";

export type CloseButtonProps = {
  /**
   * 外观
   * @default "ghost"
   */
  variant?: ButtonStyleProps["variant"];

  /**
   * 颜色
   * @default "neutral"
   */
  color?: ButtonStyleProps["color"];

  /**
   * 大小
   * @default "1.5em"
   */
  size?: string | number;
};

export const CloseButton = (props: PrimitiveProps<"button", CloseButtonProps, "type">) => {
  const { className, disabled, variant = "ghost", color = "neutral", size = "1.5em", children, ...rest } = props;

  return (
    <Button
      type={"button"}
      disabled={disabled}
      variant={variant}
      color={color}
      size={"xs"}
      iconOnly
      hasPadding={false}
      radius={"full"}
      aria-label="关闭"
      className={tx("p-1 leading-none", className)}
      {...rest}
    >
      {children || (
        <svg
          style={{ width: size }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
    </Button>
  );
};
