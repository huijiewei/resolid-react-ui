export const selectSizeStyles = {
  xs: {
    select: "pl-2.5 pr-7",
    chevron: "px-1.5",
  },
  sm: {
    select: "pl-3 pr-8",
    chevron: "px-2",
  },
  md: {
    select: "pl-3.5 pr-8",
    chevron: "px-2",
  },
  lg: {
    select: "pl-4 pr-10",
    chevron: "px-2",
  },
  xl: {
    select: "pl-4 pr-10",
    chevron: "px-2.5",
  },
};

export type SelectSize = keyof typeof selectSizeStyles;
