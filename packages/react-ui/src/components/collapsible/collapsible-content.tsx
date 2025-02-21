import { type CSSProperties, useEffect, useState } from "react";
import { useMergeRefs } from "../../hooks";
import type { EmptyObject, PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";
import { useCollapsibleContent } from "./collapsible-context";

export const CollapsibleContent = (props: PrimitiveProps<"div", EmptyObject, "id">) => {
  const { children, ref, ...rest } = props;

  const { id, open, mounted, status, setElement } = useCollapsibleContent();

  const [height, setHeight] = useState<number>();

  const [skipAnimation, setSkipAnimation] = useState(open || mounted);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setSkipAnimation(false);
    });

    return () => {
      cancelAnimationFrame(raf);
    };
  }, []);

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
      className={tx(
        "overflow-hidden",
        !skipAnimation && "duration-(--dv) overflow-hidden transition-[height]",
        skipAnimation || status == "open" ? "h-(--hv)" : "h-0",
      )}
    >
      <div id={id} ref={refs} {...rest}>
        {children}
      </div>
    </div>
  );
};
