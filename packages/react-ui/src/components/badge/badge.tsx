import { type HtmlProps, Polymorphic, type PolymorphicProps } from "../../primitives";
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

type BadgeHtmlProps = HtmlProps<"span", BadgeProps>;

export const Badge = (props: PolymorphicProps<BadgeHtmlProps, BadgeProps>) => {
  const { render, color = "primary", variant = "solid", className, children, ...rest } = props;

  return (
    <Polymorphic<BadgeHtmlProps>
      as={"span"}
      render={render}
      className={tx(badgeStyles({ color, variant }), className)}
      {...rest}
    >
      {children}
    </Polymorphic>
  );
};
