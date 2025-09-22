import type { JSX } from "react/jsx-runtime";
import { Polymorphic, type PolymorphicProps } from "../../primitives";
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

export const Badge = (props: PolymorphicProps<"span", BadgeProps>): JSX.Element => {
  const { render, color = "primary", variant = "solid", className, children, ...rest } = props;

  return (
    <Polymorphic<"span">
      as={"span"}
      render={render}
      className={tx(badgeStyles({ color, variant }), className)}
      {...rest}
    >
      {children}
    </Polymorphic>
  );
};
