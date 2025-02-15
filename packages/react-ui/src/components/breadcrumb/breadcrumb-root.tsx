import type { PrimitiveProps } from "../../primitives";
import { AngleRightIcon } from "../../shared/icons";
import { tx } from "../../utils";
import { BreadcrumbContext, type BreadcrumbContextValue } from "./breadcrumb-context";

export type BreadcrumbRootProps = BreadcrumbContextValue;

export const BreadcrumbRoot = (props: PrimitiveProps<"nav", BreadcrumbRootProps>) => {
  const { children, className, separator = <AngleRightIcon />, ...rest } = props;

  return (
    <nav aria-label="Breadcrumb" {...rest}>
      <BreadcrumbContext value={{ separator }}>
        <ol className={tx("inline-flex items-center", className)}>{children}</ol>
      </BreadcrumbContext>
    </nav>
  );
};
