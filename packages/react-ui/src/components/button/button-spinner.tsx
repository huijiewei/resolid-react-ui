import type { PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";
import { Spinner } from "../spinner/spinner";
import type { ButtonStyleProps } from "./button.styles";

export type ButtonSpinnerProps = {
  size: NonNullable<ButtonStyleProps["size"]>;
  label?: string;
};

const SpinnerSizes: Record<string, ButtonSpinnerProps["size"]> = {
  xs: "xs",
  sm: "xs",
  md: "sm",
  lg: "md",
  xl: "lg",
};

export const ButtonSpinner = (props: PrimitiveProps<"span", ButtonSpinnerProps>) => {
  const { label, size, className, children = <Spinner size={SpinnerSizes[size]} />, ...rest } = props;

  return (
    <span className={tx("flex items-center justify-center", label ? "relative" : "absolute", className)} {...rest}>
      {children}
    </span>
  );
};
