export const selectSizeStyles = {
  xs: {
    select: "pr-7",
    chevron: "px-1.5",
    native: "pl-2.5",
    root: "pl-1",
    item: "ps-1.5",
  },
  sm: {
    select: "pr-8",
    chevron: "px-2",
    native: "pl-3",
    root: "pl-1",
    item: "ps-1.5",
  },
  md: {
    select: "pr-8",
    chevron: "px-2",
    native: "pl-3.5",
    root: "pl-1.5",
    item: "ps-1.5",
  },
  lg: {
    select: "pr-10",
    chevron: "px-2",
    native: "pl-4",
    root: "pl-1.5",
    item: "ps-2",
  },
  xl: {
    select: "pr-10",
    chevron: "px-2.5",
    native: "pl-4",
    root: "pl-1.5",
    item: "ps-2",
  },
};

export type SelectSize = keyof typeof selectSizeStyles;
