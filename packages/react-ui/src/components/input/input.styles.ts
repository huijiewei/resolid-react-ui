import { tv } from "../../utils";

export const inputHeightStyles = {
  xs: "py-[5px] min-h-7",
  sm: "py-[5px] min-h-8",
  md: "py-[5px] min-h-9",
  lg: "py-[7px] min-h-10",
  xl: "py-[7px] min-h-11",
};

export const inputSizeStyles = {
  xs: "px-2.5",
  sm: "px-2.5",
  md: "px-3",
  lg: "px-3.5",
  xl: "px-3.5",
};

export const inputStyles = tv({
  base: [
    "relative inline-flex items-center rounded-md border",
    "outline-1 outline-transparent transition-colors",
    "focus-within:border-bg-primary-emphasis focus-within:outline-bg-primary-emphasis/70",
  ],
  variants: {
    disabled: {
      true: "opacity-60",
    },
    invalid: {
      true: "border-bd-invalid",
      false: "border-bd-normal",
    },
    fullWidth: {
      true: "w-full",
    },
  },
  compoundVariants: [
    {
      disabled: false,
      invalid: false,
      className: "not-focus-within:hover:border-bd-hovered",
    },
  ],
});

export type InputSize = keyof typeof inputSizeStyles;

export const inputAffixDefaultSizes = {
  xs: "28px",
  sm: "32px",
  md: "36px",
  lg: "40px",
  xl: "44px",
};

export const inputGroupStyles =
  "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none not-first:-ms-px";
