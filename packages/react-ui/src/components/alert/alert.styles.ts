import { alertAndBadgeShareStyles } from "../../shared/styles";
import { tv, type VP } from "../../utils";

export const alertStyles = tv({ base: "relative rounded-md border p-4", extend: alertAndBadgeShareStyles });

export type AlertStyleProps = VP<typeof alertStyles>;
