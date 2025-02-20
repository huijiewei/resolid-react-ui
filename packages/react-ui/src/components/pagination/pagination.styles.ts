export const currentPageColorStyles = {
  primary: "bg-bg-primary-emphasis",
  secondary: "bg-bg-secondary-emphasis",
  success: "bg-bg-success-emphasis",
  warning: "bg-bg-warning-emphasis",
  danger: "bg-bg-danger-emphasis",
  neutral: "bg-bg-neutral-emphasis",
};

export type PageColor = keyof typeof currentPageColorStyles;
