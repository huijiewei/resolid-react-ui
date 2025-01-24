import { tv, type VP } from "../../utils";

export const buttonStyles = tv({
  base: [
    "inline-flex items-center justify-center rounded-md border",
    "select-none appearance-none whitespace-nowrap font-medium",
    "transition-colors",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
  ],
  variants: {
    variant: {
      solid: "text-fg-emphasized border-transparent",
      outline: "",
      subtle: "",
      soft: "border-transparent",
      ghost: "border-transparent",
      link: "underline-offset-3 border-transparent underline",
    },
    color: {
      primary: "focus-visible:outline-bg-primary-emphasis/70",
      secondary: "focus-visible:outline-bg-secondary-emphasis/70",
      success: "focus-visible:outline-bg-success-emphasis/70",
      warning: "focus-visible:outline-bg-warning-emphasis/70",
      danger: "focus-visible:outline-bg-danger-emphasis/70",
      neutral: "focus-visible:outline-bg-neutral-emphasis/70",
    },
    size: {
      xs: "h-7 text-xs",
      sm: "h-8 text-sm",
      md: "h-9 text-sm",
      lg: "h-10 text-base",
      xl: "h-11 text-base",
    },
    disabled: {
      true: "pointer-events-none opacity-50",
      false: "cursor-pointer",
    },
    fullWidth: {
      true: "w-full",
      false: "",
    },
    iconOnly: {
      true: "aspect-square",
      false: "",
    },
  },
  compoundVariants: [
    {
      color: "primary",
      variant: "solid",
      className: "bg-bg-primary-emphasis",
    },
    {
      color: "primary",
      variant: "solid",
      disabled: false,
      className: "hover:bg-bg-primary-emphasis-hovered active:bg-bg-primary-emphasis-pressed",
    },
    {
      color: "primary",
      variant: ["outline", "subtle", "soft", "ghost", "link"],
      className: "text-fg-primary",
    },
    {
      color: "primary",
      variant: ["outline", "ghost"],
      disabled: false,
      className: "hover:bg-bg-primary active:bg-bg-primary-hovered",
    },
    {
      color: "primary",
      variant: ["subtle", "soft"],
      className: "bg-bg-primary",
    },
    {
      color: "primary",
      variant: ["subtle", "soft"],
      disabled: false,
      className: "hover:bg-bg-primary-hovered active:bg-bg-primary-pressed",
    },
    {
      color: "primary",
      variant: "link",
      disabled: false,
      className: "hover:text-fg-primary-hovered active:text-fg-primary-pressed",
    },

    {
      color: "secondary",
      variant: "solid",
      className: "bg-bg-secondary-emphasis",
    },
    {
      color: "secondary",
      variant: "solid",
      disabled: false,
      className: "hover:bg-bg-secondary-emphasis-hovered active:bg-bg-secondary-emphasis-pressed",
    },
    {
      color: "secondary",
      variant: ["outline", "subtle", "soft", "ghost", "link"],
      className: "text-fg-secondary",
    },
    {
      color: "secondary",
      variant: ["outline", "ghost"],
      disabled: false,
      className: "hover:bg-bg-secondary active:bg-bg-secondary-hovered",
    },
    {
      color: "secondary",
      variant: ["subtle", "soft"],
      className: "bg-bg-secondary",
    },
    {
      color: "secondary",
      variant: ["subtle", "soft"],
      disabled: false,
      className: "hover:bg-bg-secondary-hovered active:bg-bg-secondary-pressed",
    },
    {
      color: "secondary",
      variant: "link",
      disabled: false,
      className: "hover:text-fg-secondary-hovered active:text-fg-secondary-pressed",
    },

    {
      color: "success",
      variant: "solid",
      className: "bg-bg-success-emphasis",
    },
    {
      color: "success",
      variant: "solid",
      disabled: false,
      className: "hover:bg-bg-success-emphasis-hovered active:bg-bg-success-emphasis-pressed",
    },
    {
      color: "success",
      variant: ["outline", "subtle", "soft", "ghost", "link"],
      className: "text-fg-success",
    },
    {
      color: "success",
      variant: ["outline", "ghost"],
      disabled: false,
      className: "hover:bg-bg-success active:bg-bg-success-hovered",
    },
    {
      color: "success",
      variant: ["subtle", "soft"],
      className: "bg-bg-success",
    },
    {
      color: "success",
      variant: ["subtle", "soft"],
      disabled: false,
      className: "hover:bg-bg-success-hovered active:bg-bg-success-pressed",
    },
    {
      color: "success",
      variant: "link",
      disabled: false,
      className: "hover:text-fg-success-hovered active:text-fg-success-pressed",
    },

    {
      color: "warning",
      variant: "solid",
      className: "bg-bg-warning-emphasis",
    },
    {
      color: "warning",
      variant: "solid",
      disabled: false,
      className: "hover:bg-bg-warning-emphasis-hovered active:bg-bg-warning-emphasis-pressed",
    },
    {
      color: "warning",
      variant: ["outline", "subtle", "soft", "ghost", "link"],
      className: "text-fg-warning",
    },
    {
      color: "warning",
      variant: ["outline", "ghost"],
      disabled: false,
      className: "hover:bg-bg-warning active:bg-bg-warning-hovered",
    },
    {
      color: "warning",
      variant: ["subtle", "soft"],
      className: "bg-bg-warning",
    },
    {
      color: "warning",
      variant: ["subtle", "soft"],
      disabled: false,
      className: "hover:bg-bg-warning-hovered active:bg-bg-warning-pressed",
    },
    {
      color: "warning",
      variant: "link",
      disabled: false,
      className: "hover:text-fg-warning-hovered active:text-fg-warning-pressed",
    },

    {
      color: "danger",
      variant: "solid",
      className: "bg-bg-danger-emphasis",
    },
    {
      color: "danger",
      variant: "solid",
      disabled: false,
      className: "hover:bg-bg-danger-emphasis-hovered active:bg-bg-danger-emphasis-pressed",
    },
    {
      color: "danger",
      variant: ["outline", "subtle", "soft", "ghost", "link"],
      className: "text-fg-danger",
    },
    {
      color: "danger",
      variant: ["outline", "ghost"],
      disabled: false,
      className: "hover:bg-bg-danger active:bg-bg-danger-hovered",
    },
    {
      color: "danger",
      variant: ["subtle", "soft"],
      className: "bg-bg-danger",
    },
    {
      color: "danger",
      variant: ["subtle", "soft"],
      disabled: false,
      className: "hover:bg-bg-danger-hovered active:bg-bg-danger-pressed",
    },
    {
      color: "danger",
      variant: "link",
      disabled: false,
      className: "hover:text-fg-danger-hovered active:text-fg-danger-pressed",
    },

    {
      color: "neutral",
      variant: "solid",
      className: "bg-bg-neutral-emphasis",
    },
    {
      color: "neutral",
      variant: "solid",
      disabled: false,
      className: "hover:bg-bg-neutral-emphasis-hovered active:bg-bg-neutral-emphasis-pressed",
    },
    {
      color: "neutral",
      variant: ["outline", "ghost"],
      disabled: false,
      className: "hover:bg-bg-neutral active:bg-bg-neutral-hovered",
    },
    {
      color: "neutral",
      variant: ["subtle", "soft"],
      className: "bg-bg-neutral",
    },
    {
      color: "neutral",
      variant: ["outline", "subtle"],
      className: "border-bd-hovered",
    },
    {
      color: "neutral",
      variant: ["subtle", "soft"],
      disabled: false,
      className: "hover:bg-bg-neutral-hovered active:bg-bg-neutral-pressed",
    },
    {
      color: "neutral",
      variant: "link",
      disabled: false,
      className: "hover:text-fg-neutral-hovered active:text-fg-neutral-pressed",
    },

    {
      iconOnly: false,
      size: "xs",
      className: "px-2.5",
    },
    {
      iconOnly: false,
      size: "sm",
      className: "px-3",
    },
    {
      iconOnly: false,
      size: "md",
      className: "px-3.5",
    },
    {
      iconOnly: false,
      size: "lg",
      className: "px-4",
    },
    {
      iconOnly: false,
      size: "xl",
      className: "px-5",
    },
  ],
  defaultVariants: {
    variant: "solid",
    color: "primary",
    size: "md",
  },
});

export type ButtonStyleProps = VP<typeof buttonStyles>;
