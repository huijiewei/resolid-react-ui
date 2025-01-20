import type { PrimitiveProps } from "../../primitives";
import { cx } from "../../utils";
import { VisuallyHidden } from "../visually-hidden/visually-hidden";
import { type SpinnerStyles, spinnerStyles } from "./spinner.styles";

export type SpinnerProps = {
  /**
   * 大小
   * @default 'md'
   */
  size?: SpinnerStyles["size"];

  /**
   * 颜色
   * @default 'primary'
   */
  color?: SpinnerStyles["color"];

  /**
   * 标签
   * @default '加载中'
   */
  label?: string;
};

export const Spinner = (props: PrimitiveProps<"span", SpinnerProps>) => {
  const { label = "加载中", className, size = "md", color = "primary", ...rest } = props;

  return (
    <span className={cx(spinnerStyles({ color, size }), className)} {...rest}>
      {label && <VisuallyHidden>{label}</VisuallyHidden>}
    </span>
  );
};
