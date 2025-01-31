export const switchSizeStyles = {
  xs: { track: "h-4 w-8", thumb: "translate-x-4" },
  sm: { track: "h-5 w-10", thumb: "translate-x-5" },
  md: { track: "h-6 w-12", thumb: "translate-x-6" },
  lg: { track: "h-7 w-14", thumb: "translate-x-7" },
  xl: { track: "h-8 w-16", thumb: "translate-x-8" },
};

export type SwitchSize = keyof typeof switchSizeStyles;
