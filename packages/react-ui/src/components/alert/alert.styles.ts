import { alertAndBadgeShareStyles } from "../../shared/styles";
import { tcm, tv, type VP } from "../../utils";

export const alertStyles = tcm(tv({ base: "relative rounded-md border p-4" }), alertAndBadgeShareStyles);

export type AlertStyleProps = VP<typeof alertStyles>;
