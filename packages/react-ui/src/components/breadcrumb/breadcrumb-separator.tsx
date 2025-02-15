import type { EmptyObject, PrimitiveProps } from "../../primitives";
import { useBreadcrumb } from "./breadcrumb-context";

export const BreadcrumbSeparator = (props: PrimitiveProps<"span", EmptyObject, "role">) => {
  const { separator } = useBreadcrumb();

  return (
    <span className={"text-fg-subtle inline-flex items-center"} aria-hidden="true" role="presentation" {...props}>
      {separator}
    </span>
  );
};
