import { tv, type TvReturnType, type VP } from "../../utils";

type SpinnerVariants = {
  size: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  color: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
    neutral: string;
  };
};

export const spinnerStyles: TvReturnType<SpinnerVariants, undefined, string, SpinnerVariants, undefined> = tv({
  base: "inline-block animate-spin rounded-full",
  variants: {
    size: {
      xs: "h-3 w-3 border-2",
      sm: "h-4 w-4 border-2",
      md: "h-5 w-5 border-2",
      lg: "h-6 w-6 border-3",
      xl: "h-7 w-7 border-3",
    },
    color: {
      primary: "border-t-fg-primary border-r-fg-primary border-b-bg-primary border-l-bg-primary",
      secondary: "border-t-fg-secondary border-r-fg-secondary border-b-bg-secondary border-l-bg-secondary",
      success: "border-t-fg-success border-r-fg-success border-b-bg-success border-l-bg-success",
      warning: "border-t-fg-warning border-r-fg-warning border-b-bg-warning border-l-bg-warning",
      danger: "border-t-fg-danger border-r-fg-danger border-b-bg-danger border-l-bg-danger",
      neutral: "border-t-fg-neutral border-r-fg-neutral border-b-bg-neutral border-l-bg-neutral",
    },
  },
});

export type SpinnerStyleProps = VP<typeof spinnerStyles>;
