import type { ReactNode } from "react";
import type { AnyObject } from "../../primitives";

export type ListboxValue = (string | number)[] | string | number | null;

export type ListboxFieldNames = {
  value?: string;
  label?: string;
  disabled?: string;
  children?: string;
};

export type ListboxListItem<F extends ListboxFieldNames> = AnyObject & {
  [P in F["value"] & string]?: string | number;
} & {
  [K in F["label"] & string]?: string;
} & {
  [K in F["disabled"] & string]?: boolean;
} & {
  [K in F["children"] & string]?: ListboxListItem<F>[];
};

export type ListboxNodeItem<F extends ListboxFieldNames> = ListboxListItem<F> & { __index: number };

export type ListboxFlatItem<F extends ListboxFieldNames> = Omit<ListboxListItem<F>, keyof Pick<F, "children">>;

export type ListboxGroupLabel<F extends ListboxFieldNames> = Omit<
  ListboxListItem<F>,
  keyof Pick<F, "value" | "disabled" | "children">
>;

export const defaultFieldNames = {
  value: "value",
  label: "label",
  disabled: "disabled",
  children: "children",
};

export type ListboxRenderItem<F extends ListboxFieldNames> = (
  item: ListboxFlatItem<F>,
  status: { active: boolean; selected: boolean },
) => ReactNode;

export type ListboxRenderGroupLabel<F extends ListboxFieldNames> = (label: ListboxGroupLabel<F>) => ReactNode;

export const checkSelected = <F extends ListboxFieldNames>(
  value: ListboxValue,
  item: ListboxListItem<F>,
  valueKey: string,
) => {
  return Array.isArray(value) ? value.includes(item[valueKey] as string | number) : value == item[valueKey];
};
