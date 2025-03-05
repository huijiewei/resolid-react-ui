import { type CSSProperties, useEffect, useRef, useState } from "react";
import { useIsomorphicEffect, useMergeRefs } from "../../hooks";
import type { EmptyObject, PrimitiveProps } from "../../primitives";
import { useOrientation } from "../../primitives/composite/orientation-context";
import { tx } from "../../utils";
import { useCollapsibleContent } from "./collapsible-context";

export const CollapsibleContent = (props: PrimitiveProps<"div", EmptyObject, "id">) => {
  const { children, ref, ...rest } = props;

  const { id, open, mounted, status, setElement } = useCollapsibleContent();

  const orientation = useOrientation(true);

  const elemRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ width?: number; height?: number }>();

  const [skipAnimation, setSkipAnimation] = useState(open || mounted);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setSkipAnimation(false);
    });

    return () => {
      cancelAnimationFrame(raf);
    };
  }, []);

  useIsomorphicEffect(() => {
    if (mounted && elemRef.current) {
      const rect = elemRef.current.getBoundingClientRect();

      setSize({
        width: rect.width,
        height: rect.height,
      });
    }
  }, [mounted]);

  const refs = useMergeRefs(ref, elemRef, setElement);

  if (!mounted) {
    return null;
  }

  const horizontal = orientation == "horizontal";

  return (
    <div
      role={"presentation"}
      style={
        {
          "--hv": size?.height ? `${size.height}px` : undefined,
          "--wv": size?.width ? `${size.width}px` : undefined,
        } as CSSProperties
      }
      className={tx(
        "overflow-hidden",
        !skipAnimation && ["duration-(--dv)", horizontal ? "transition-[width]" : "transition-[height]"],
        skipAnimation || status == "open" ? (horizontal ? "w-(--wv)" : "h-(--hv)") : horizontal ? "w-0" : "h-0",
      )}
    >
      <div id={id} ref={refs} {...rest}>
        {children}
      </div>
    </div>
  );
};
