import { tv } from "../utils";

export const alertAndBadgeShareStyles = tv({
  variants: {
    variant: {
      solid: "text-fg-emphasized border-transparent",
      outline: "bg-bg-normal border-current",
      subtle: "border-current",
      soft: "border-transparent",
    },
    color: {
      primary: "",
      secondary: "",
      neutral: "",
      success: "",
      warning: "",
      danger: "",
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
      variant: ["outline", "soft", "subtle"],
      className: "text-fg-primary",
    },
    {
      color: "primary",
      variant: ["soft", "subtle"],
      className: "bg-bg-primary",
    },
    {
      color: "secondary",
      variant: "solid",
      className: "bg-bg-secondary-emphasis",
    },
    {
      color: "secondary",
      variant: ["outline", "soft", "subtle"],
      className: "text-fg-secondary",
    },
    {
      color: "secondary",
      variant: ["soft", "subtle"],
      className: "bg-bg-secondary",
    },
    {
      color: "success",
      variant: "solid",
      className: "bg-bg-success-emphasis",
    },
    {
      color: "success",
      variant: ["outline", "soft", "subtle"],
      className: "text-fg-success",
    },
    {
      color: "success",
      variant: ["soft", "subtle"],
      className: "bg-bg-success",
    },

    {
      color: "warning",
      variant: "solid",
      className: "bg-bg-warning-emphasis",
    },
    {
      color: "warning",
      variant: ["outline", "soft", "subtle"],
      className: "text-fg-warning",
    },
    {
      color: "warning",
      variant: ["soft", "subtle"],
      className: "bg-bg-warning",
    },
    {
      color: "danger",
      variant: "solid",
      className: "bg-bg-danger-emphasis",
    },
    {
      color: "danger",
      variant: ["outline", "soft", "subtle"],
      className: "text-fg-danger",
    },
    {
      color: "danger",
      variant: ["soft", "subtle"],
      className: "bg-bg-danger",
    },
    {
      color: "neutral",
      variant: "solid",
      className: "bg-bg-neutral-emphasis",
    },
    {
      color: "neutral",
      variant: ["soft", "subtle"],
      className: "bg-bg-neutral",
    },
  ],
});
