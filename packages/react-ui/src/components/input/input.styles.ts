export const inputSizeStyles = {
  xs: "px-2.5 py-[5px]",
  sm: "px-3 py-[5px]",
  md: "px-3.5 py-[5px]",
  lg: "px-4 py-[7px]",
  xl: "px-5 py-[7px]",
};

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
