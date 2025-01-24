import { type ElementType, type ReactNode, useState } from "react";
import { useMergeRefs } from "../../hooks";
import type { PolymorphicProps } from "../../primitives";
import { ariaAttr, cx, dataAttr } from "../../utils";
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
   * @default 'start'
   */
  spinnerPlacement?: "start" | "end";
};

export const Button = <T extends ElementType = "button">(props: PolymorphicProps<T, ButtonProps, "role">) => {
  const group = useButtonGroup();

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
    className,
    children,
    ref,
    ...rest
  } = props;

  const [tagType, setTagType] = useState<"BUTTON" | "INPUT" | "LINK" | null>(null);

  const isNativeButton = tagType == "BUTTON";
  const isNativeLink = tagType == "LINK";

  const refs = useMergeRefs((element: HTMLElement) => {
    if (element && element.tagName == "BUTTON") {
      setTagType("BUTTON");
    } else if (element && element.tagName == "A" && element.getAttribute("href") != null) {
      setTagType("LINK");
    }

    return () => {
      setTagType(null);
    };
  }, ref);

  const disabledStatus = disabled || loading;

  return (
    <Component
      className={cx(
        buttonStyles({ variant, color, size, disabled: disabledStatus, fullWidth, iconOnly }),
        group &&
          cx(
            "not-last:not-first:rounded-none",
            group.orientation == "horizontal"
              ? "not-only:first:rounded-e-none not-only:last:rounded-s-none"
              : "not-only:first:rounded-b-none not-only:last:rounded-t-none",
          ),
        className,
      )}
      type={isNativeButton ? type : undefined}
      role={!isNativeButton && !isNativeLink ? "button" : undefined}
      disabled={isNativeButton ? disabledStatus : undefined}
      aria-disabled={ariaAttr(!isNativeButton && disabledStatus)}
      data-disabled={dataAttr(disabledStatus)}
      data-active={dataAttr(active)}
      tabIndex={!isNativeButton && !isNativeLink && !disabledStatus ? 0 : undefined}
      ref={refs}
      {...rest}
    >
      {loading ? (
        <div
          className={cx(
            "relative inline-flex items-center justify-center gap-2",
            loadingText && spinnerPlacement == "end" && "flex-row-reverse",
          )}
        >
          <ButtonSpinner label={loadingText} size={size}>
            {spinner}
          </ButtonSpinner>
          {loadingText || <span className={"opacity-0"}>{children}</span>}
        </div>
      ) : (
        children
      )}
    </Component>
  );
};
