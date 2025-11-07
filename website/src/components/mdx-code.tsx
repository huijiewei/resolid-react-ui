import { type PrimitiveProps, tx } from "@resolid/react-ui";
import { useState } from "react";
import { ClipboardButton } from "~/components/clipboard-button";
import { StackblitzButton } from "~/components/stackblitz-button";

export const MdxCode = (
  props: PrimitiveProps<"pre", { "data-inline"?: boolean; codeGroup?: string; online?: string }>,
) => {
  const { children, className, "data-inline": dataInline, codeGroup, online, ...rest } = props;

  const [content, setContent] = useState("");

  if (dataInline) {
    return (
      <pre translate={"no"} className={className} {...rest}>
        {children}
      </pre>
    );
  }

  const preRef = (node: HTMLPreElement) => {
    if (node) {
      setContent(node.innerText);
    }
  };

  return (
    <div role={"figure"} className={"relative"}>
      <pre
        ref={preRef}
        translate={"no"}
        className={tx(
          !codeGroup && "scrollbar scrollbar-thin rounded-md border border-bd-normal p-3",
          !codeGroup && "group-[.is-demo]:mt-0 group-[.is-demo]:rounded-t-none group-[.is-demo]:border-t-0",
          codeGroup && "mt-0 mb-0",
          className,
        )}
        {...rest}
        tabIndex={-1}
      >
        {children}
      </pre>
      <div className={"z-base absolute top-1.5 right-1.5 flex gap-1"}>
        {online && <StackblitzButton name={online} code={content} />}
        <ClipboardButton content={content} />
      </div>
    </div>
  );
};
