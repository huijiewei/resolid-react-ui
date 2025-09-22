import type { JSX } from "react/jsx-runtime";
import type { EmptyObject, PrimitiveProps } from "../../primitives";
import { useBreadcrumb } from "./breadcrumb-context";

export const BreadcrumbSeparator = (props: PrimitiveProps<"span", EmptyObject, "role">): JSX.Element => {
  const { separator } = useBreadcrumb();

  return (
    <span className={"text-fg-subtle inline-flex items-center"} aria-hidden="true" role="presentation" {...props}>
      {separator}
    </span>
  );
};
