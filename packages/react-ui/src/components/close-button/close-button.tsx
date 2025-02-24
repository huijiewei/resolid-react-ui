import type { PrimitiveProps } from "../../primitives";
import { CloseIcon } from "../../shared/icons";
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
  size?: string;

  /**
   * 无内边距
   * @default false
   */
  noPadding?: boolean;
};

export const CloseButton = (props: PrimitiveProps<"button", CloseButtonProps, "type">) => {
  const {
    className,
    disabled,
    noPadding = false,
    variant = "ghost",
    color = "neutral",
    size = "1.5em",
    children,
    ...rest
  } = props;

  return (
    <Button
      type={"button"}
      disabled={disabled}
      variant={variant}
      color={color}
      iconOnly
      noPadding
      radius={"full"}
      aria-label="关闭"
      className={tx("leading-none", !noPadding && "p-1", className)}
      {...rest}
    >
      {children || <CloseIcon size={size} />}
    </Button>
  );
};
