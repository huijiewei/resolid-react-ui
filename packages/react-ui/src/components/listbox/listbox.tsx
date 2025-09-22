import { ListboxRoot, type ListboxRootProps } from "./listbox-root";
import type { ListboxItem } from "./use-listbox";

export type ListboxProps<T extends ListboxItem = ListboxItem> = ListboxRootProps<T>;

export const Listbox: typeof ListboxRoot = ListboxRoot;

export { ListboxContent } from "./listbox-content";
export { ListboxFilter } from "./listbox-filter";
export { ListboxList } from "./listbox-list";
export { ListboxVirtualizer } from "./listbox-virtualizer";
