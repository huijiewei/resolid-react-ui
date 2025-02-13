import { type CSSProperties, useState } from "react";
import { useMergeRefs } from "../../hooks";
import type { PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";
import { useCollapsibleContent } from "./collapsible-context";

export const CollapsibleContent = (props: PrimitiveProps<"div", Record<never, never>, "id">) => {
  const { children, ref, ...rest } = props;

  const { id, mounted, status, setElement } = useCollapsibleContent();

  const [height, setHeight] = useState<number>();

  const elemRef = (node: HTMLDivElement) => {
    if (node) {
      setHeight(node.getBoundingClientRect().height);
    }
  };

  const refs = useMergeRefs(ref, elemRef, setElement);

  if (!mounted) {
    return null;
  }

  return (
    <div
      role={"presentation"}
      style={
        {
          "--hv": height ? `${height}px` : undefined,
        } as CSSProperties
      }
      className={tx("duration-(--dv) overflow-hidden transition-[height]", status == "open" ? "h-(--hv)" : "h-0")}
    >
      <div id={id} ref={refs} {...rest}>
        {children}
      </div>
    </div>
  );
};
