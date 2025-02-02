import type { PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";
import { AlertContext, type AlertContextValue, useAlert } from "./alert-context";
import { alertStyles } from "./alert.styles";

export type AlertProps = Partial<AlertContextValue>;

export const Alert = (props: PrimitiveProps<"div", AlertProps, "role">) => {
  const { children, className, color = "primary", variant = "soft", ...rest } = props;
  return (
    <div role={"alert"} className={tx(alertStyles({ variant, color }), className)} {...rest}>
      <AlertContext value={{ variant, color }}>{children}</AlertContext>
    </div>
  );
};

export const AlertContent = (props: PrimitiveProps<"div">) => {
  const { className, ...rest } = props;

  return <div className={className} {...rest} />;
};

export const AlertTitle = (props: PrimitiveProps<"div">) => {
  const { className, ...rest } = props;

  return <div className={tx("font-medium", className)} {...rest} />;
};

export const AlertDescription = (props: PrimitiveProps<"div">) => {
  const { className, ...rest } = props;

  const { variant } = useAlert();

  return <div className={tx(variant != "solid" ? "text-fg-normal" : "text-fg-emphasized", className)} {...rest} />;
};

export const AlertIndicator = (props: PrimitiveProps<"span">) => {
  const { className, ...rest } = props;

  return <span className={tx("shrink-0", className)} {...rest} />;
};
