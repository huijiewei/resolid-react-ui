import { BreadcrumbRoot, type BreadcrumbRootProps } from "./breadcrumb-root";

export type BreadcrumbProps = BreadcrumbRootProps;

export const Breadcrumb: typeof BreadcrumbRoot = BreadcrumbRoot;

export { BreadcrumbItem } from "./breadcrumb-item";
export { BreadcrumbLink } from "./breadcrumb-link";
export { BreadcrumbSeparator } from "./breadcrumb-separator";
