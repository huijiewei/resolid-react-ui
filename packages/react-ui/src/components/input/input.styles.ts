import { tv, type TvReturnType } from "../../utils";

export const inputHeightStyles = {
  xs: "py-[5px] min-h-6.5",
  sm: "py-[5px] min-h-7.5",
  md: "py-[5px] min-h-8.5",
  lg: "py-[7px] min-h-9.5",
  xl: "py-[7px] min-h-10.5",
};

export const inputSizeStyles = {
  xs: "px-2.5",
  sm: "px-2.5",
  md: "px-3",
  lg: "px-3.5",
  xl: "px-3.5",
};

type InputVariants = {
  disabled: {
    true: string;
    false: string;
  };
  invalid: {
    true: string;
    false: string;
  };
  active: {
    true: string;
    false: string;
  };
  focusable: {
    true: string;
    false: string;
  };
};

export const inputStyles: TvReturnType<InputVariants, undefined, string[], InputVariants, undefined> = tv({
  base: ["relative inline-flex items-center rounded-md border", "outline-1 outline-transparent transition-colors"],
  variants: {
    disabled: { true: "opacity-60", false: "" },
    invalid: { true: "border-bd-invalid", false: "border-bd-normal" },
    active: { true: "", false: "" },
    focusable: { true: "", false: "" },
  },
  compoundVariants: [
    {
      disabled: false,
      invalid: false,
      active: false,
      className: "not-focus-within:hover:border-bd-hovered",
    },
    {
      disabled: false,
      active: false,
      focusable: true,
      className: "focus-within:border-bg-primary-emphasis focus-within:outline-bg-primary-emphasis/70",
    },
  ],
});

export type InputSize = keyof typeof inputSizeStyles;

export const inputAffixDefaultSizes = {
  xs: "26px",
  sm: "30px",
  md: "34px",
  lg: "38px",
  xl: "42px",
};

export const inputGroupStyles =
  "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none not-first:-ms-px";
