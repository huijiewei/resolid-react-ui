import { alertAndBadgeShareStyles } from "../../shared/styles";
import { tv, type VP } from "../../utils";

export const badgeStyles = tv({
  base: "inline-flex items-center rounded-md border px-2 py-1 text-xs",
  extend: alertAndBadgeShareStyles,
});

export type BadgeStyleProps = VP<typeof badgeStyles>;
