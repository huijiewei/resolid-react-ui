import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@resolid/react-ui";
import type { ComponentProps, ReactElement } from "react";
import { SpriteIcon } from "~/components/sprite-icon";

export type MdxDetailsProps = {
  summary?: ReactElement | string;
} & ComponentProps<"details">;

export const MdxDetails = ({ summary, children }: MdxDetailsProps) => {
  return (
    <Collapsible className={"border-bd-normal mb-3 border-b pb-3 pt-0"}>
      <CollapsibleTrigger className={"group flex w-full flex-row items-center justify-between"}>
        <h6 className={"font-medium [&>summary]:list-none"}>{summary}</h6>

        <SpriteIcon
          className={"duration-(--dv) transition-transform group-aria-expanded:rotate-180"}
          size={"1.5em"}
          name={"angle-down"}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className={"py-1 [&>p]:mb-0 [&>p]:mt-1"}>{children}</CollapsibleContent>
    </Collapsible>
  );
};
