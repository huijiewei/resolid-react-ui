import type { JSX, PropsWithChildren } from "react";
import { ListboxContent } from "../listbox/listbox-content";
import { ListboxList } from "../listbox/listbox-list";
import type { ListboxItem } from "../listbox/use-listbox";
import { ComboboxProvider } from "./combobox-provider";
import { type ComboboxProps, useCombobox } from "./use-combobox";

export type { ComboboxProps };

export const Combobox = <T extends ListboxItem>(props: PropsWithChildren<ComboboxProps<T>>): JSX.Element => {
  const { children, ...rest } = props;

  const combobox = useCombobox<T>(rest);

  return <ComboboxProvider<T> value={combobox}>{children}</ComboboxProvider>;
};

export const ComboboxContent: typeof ListboxContent = ListboxContent;

export const ComboboxList: typeof ListboxList = ListboxList;

export { ComboboxAnchor } from "./combobox-anchor";
export { ComboboxInput } from "./combobox-input";
export { ComboboxPopup } from "./combobox-popup";
export { ComboboxTrigger } from "./combobox-trigger";
export { ComboboxVirtualizer } from "./combobox-virtualizer";
