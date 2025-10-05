import { OptionEmpty } from "../../primitives/common/option-empty";
import type { ListboxFilter } from "../listbox/listbox";
import { ListboxContent, ListboxList } from "../listbox/listbox";
import { ListboxFilterBase } from "../listbox/listbox-filter-base";
import type { ListboxItem } from "../listbox/use-listbox";
import { SelectRoot, type SelectRootProps } from "./select-root";

export type SelectProps<T extends ListboxItem = ListboxItem> = SelectRootProps<T>;

export const Select: typeof SelectRoot = SelectRoot;

export const SelectFilter: typeof ListboxFilter = (props) => {
  return <ListboxFilterBase focusable={false} {...props} />;
};
export const SelectContent: typeof ListboxContent = ListboxContent;
export const SelectEmpty: typeof OptionEmpty = OptionEmpty;
export const SelectList: typeof ListboxList = ListboxList;

export { SelectVirtualizer } from "./select-virtualizer";
