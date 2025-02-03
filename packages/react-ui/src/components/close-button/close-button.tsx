import type { PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";

export type CloseButtonProps = {
  textClassName?: string;
  statusClassName?: string;
  size?: string | number;
};

export const CloseButton = (props: PrimitiveProps<"button", CloseButtonProps>) => {
  const {
    className,
    disabled,
    textClassName = "text-fg-muted",
    statusClassName = "hover:bg-bg-subtle active:bg-bg-muted",
    size = "1.5em",
    children,
    ...rest
  } = props;

  return (
    <button
      type={"button"}
      disabled={disabled}
      className={tx(
        "flex shrink-0 appearance-none items-center justify-center rounded-md outline-none transition-colors",
        textClassName,
        !disabled && `focus-visible:ring ${statusClassName}`,
        className,
      )}
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
    </button>
  );
};
