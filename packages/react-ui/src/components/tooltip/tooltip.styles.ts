import { tv, type VP } from "../../utils";

export const tooltipFloatingStyles = tv({
  variants: {
    color: {
      primary: "border-bg-primary-emphasis-hovered bg-bg-primary-emphasis-hovered",
      secondary: "border-bg-secondary-emphasis-hovered bg-bg-secondary-emphasis-hovered",
      success: "border-bg-success-emphasis-hovered bg-bg-success-emphasis-hovered",
      warning: "border-bg-warning-emphasis-hovered bg-bg-warning-emphasis-hovered",
      danger: "border-bg-danger-emphasis-hovered bg-bg-danger-emphasis-hovered",
      neutral: "border-bg-neutral-emphasis-hovered bg-bg-neutral-emphasis-hovered",
    },
  },
});

export const tooltipArrowStyles = tv({
  variants: {
    color: {
      primary: "fill-bg-primary-emphasis-hovered [&>path:first-of-type]:stroke-bg-primary-emphasis-hovered",
      secondary: "fill-bg-secondary-emphasis-hovered [&>path:first-of-type]:stroke-bg-secondary-emphasis-hovered",
      success: "fill-bg-success-emphasis-hovered [&>path:first-of-type]:stroke-bg-success-emphasis-hovered",
      warning: "fill-bg-warning-emphasis-hovered [&>path:first-of-type]:stroke-bg-warning-emphasis-hovered",
      danger: "fill-bg-danger-emphasis-hovered [&>path:first-of-type]:stroke-bg-danger-emphasis-hovered",
      neutral: "fill-bg-neutral-emphasis-hovered [&>path:first-of-type]:stroke-bg-neutral-emphasis-hovered",
    },
  },
});

export type TooltipStyleProps = VP<typeof tooltipFloatingStyles>;
