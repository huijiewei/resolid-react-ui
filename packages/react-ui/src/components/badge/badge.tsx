import type { ElementType } from "react";
import type { PolymorphicProps } from "../../primitives";
import { tx } from "../../utils";
import { type BadgeStyleProps, badgeStyles } from "./badge.styles";

export type BadgeProps = {
  /**
   * 外观
   * @default "solid"
   */
  variant?: BadgeStyleProps["variant"];

  /**
   * 颜色
   * @default "primary"
   */
  color?: BadgeStyleProps["color"];
};

export const Badge = <T extends ElementType = "span">(props: PolymorphicProps<T, BadgeProps>) => {
  const { as: Component = "span", color = "primary", variant = "solid", className, children, ...rest } = props;

  return (
    <Component className={tx(badgeStyles({ color, variant }), className)} {...rest}>
      {children}
    </Component>
  );
};
