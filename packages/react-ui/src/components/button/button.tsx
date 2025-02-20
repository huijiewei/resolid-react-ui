import { isNumber } from "@resolid/utils";
import type { CSSProperties, ReactNode } from "react";
import { useButtonProps } from "../../hooks";
import { Polymorphic, type PolymorphicProps } from "../../primitives";
import { dataAttr, tx } from "../../utils";
import { type ButtonBaseProps, useButtonGroup } from "./button-group-context";
import { ButtonSpinner } from "./button-spinner";
import { buttonStyles } from "./button.styles";

export type ButtonProps = ButtonBaseProps & {
  /**
   * 是否激活
   * @default false
   */
  active?: boolean;

  /**
   * 全宽度
   * @default false
   */
  fullWidth?: boolean;

  /**
   * 仅图标
   * @default false
   */
  iconOnly?: boolean;

  /**
   * 是否有内边距
   * @default true
   */
  hasPadding?: boolean;

  /**
   * 加载中
   * @default false
   */
  loading?: boolean;

  /**
   * 加载文本
   */
  loadingText?: string;

  /**
   * 加载器
   * @default Spinner
   */
  spinner?: ReactNode;

  /**
   * 加载器位置
   * @default "start"
   */
  spinnerPlacement?: "start" | "end";
};

export const Button = (props: PolymorphicProps<"button", ButtonProps, "role">) => {
  const group = useButtonGroup(true);

  const {
    render,
    variant = group?.variant ?? "solid",
    color = group?.color ?? "primary",
    size = group?.size ?? "md",
    radius = group?.radius ?? true,
    disabled = group?.disabled ?? false,
    active = false,
    loading = false,
    loadingText,
    spinner,
    spinnerPlacement = "start",
    fullWidth = false,
    iconOnly = false,
    hasPadding = true,
    type = "button",
    tabIndex,
    className,
    style,
    children,
    ...rest
  } = props;

  const disabledStatus = disabled || loading;

  const buttonProps = useButtonProps({
    hasRender: !!render,
    type,
    tabIndex,
    disabled: disabledStatus,
  });
  const radiusStyle = isNumber(radius) && radius > 0 ? `${radius}px` : undefined;
  const radiusClass = radiusStyle
    ? "rounded-(--rv)"
    : radius == "full"
      ? "rounded-full"
      : radius == true
        ? "rounded-md"
        : "";

  return (
    <Polymorphic<"button">
      as={"button"}
      render={render}
      {...buttonProps}
      data-active={dataAttr(active)}
      style={{ ...style, "--rv": radiusStyle } as CSSProperties}
      className={tx(
        buttonStyles({ variant, color, size, disabled: disabledStatus, fullWidth, iconOnly, hasPadding }),
        radiusClass,
        group && [
          "not-last:not-first:rounded-none focus-visible:z-1",
          group.orientation == "horizontal"
            ? "not-only:first:rounded-e-none not-only:last:rounded-s-none not-first:-ms-px"
            : "not-only:first:rounded-b-none not-only:last:rounded-t-none not-first:-mt-px",
        ],
        className,
      )}
      {...rest}
    >
      {loading ? (
        <span
          className={tx(
            "relative inline-flex items-center justify-center gap-2",
            loadingText && spinnerPlacement == "end" && "flex-row-reverse",
          )}
        >
          <ButtonSpinner label={loadingText} size={size}>
            {spinner}
          </ButtonSpinner>
          {loadingText || <span className={"opacity-0"}>{children}</span>}
        </span>
      ) : (
        children
      )}
    </Polymorphic>
  );
};
