import { alertAndBadgeShareStyles } from "../../shared/styles";
import { tcm, tv, type VP } from "../../utils";

export const badgeStyles = tcm(
  tv({ base: "inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium" }),
  alertAndBadgeShareStyles,
);

export type BadgeStyleProps = VP<typeof badgeStyles>;
