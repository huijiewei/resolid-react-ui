import type { ElementType, ReactNode } from "react";
import { useButtonProps, useMergeRefs } from "../../hooks";
import type { PolymorphicProps } from "../../primitives";
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

export const Button = <T extends ElementType = "button">(props: PolymorphicProps<T, ButtonProps, "role">) => {
  const group = useButtonGroup(true);

  const {
    as: Component = "button",
    variant = group?.variant ?? "solid",
    color = group?.color ?? "primary",
    size = group?.size ?? "md",
    disabled = group?.disabled ?? false,
    active = false,
    loading = false,
    loadingText,
    spinner,
    spinnerPlacement = "start",
    fullWidth = false,
    iconOnly = false,
    type = "button",
    tabIndex,
    className,
    children,
    ref,
    ...rest
  } = props;

  const disabledStatus = disabled || loading;

  const { getButtonProps, buttonRef } = useButtonProps({
    type,
    tabIndex,
    disabled: disabledStatus,
  });

  const refs = useMergeRefs(ref, buttonRef);

  return (
    <Component
      ref={refs}
      className={tx(
        buttonStyles({ variant, color, size, disabled: disabledStatus, fullWidth, iconOnly }),
        group &&
          tx(
            "not-last:not-first:rounded-none focus-visible:z-1",
            group.orientation == "horizontal"
              ? "not-only:first:rounded-e-none not-only:last:rounded-s-none not-first:-ms-px"
              : "not-only:first:rounded-b-none not-only:last:rounded-t-none not-first:-mt-px",
          ),
        className,
      )}
      data-active={dataAttr(active)}
      {...getButtonProps(rest)}
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
    </Component>
  );
};
