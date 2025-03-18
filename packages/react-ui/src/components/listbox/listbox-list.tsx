import type { CSSProperties } from "react";
import { useListboxCollection } from "./listbox-collection-context";
import { useListboxFields } from "./listbox-field-context";
import { ListboxGroupLabel } from "./listbox-group-label";
import { ListboxItem } from "./listbox-item";
import { useListboxState } from "./listbox-state-context";
import { useListboxVirtualizer } from "./listbox-virtualizer-context";
import type { ListboxFieldNames, ListboxNodeItem } from "./utils";

export const ListboxList = () => {
  const { size, disabled } = useListboxState();
  const { collection } = useListboxCollection();
  const { fieldNames } = useListboxFields();

  const virtual = useListboxVirtualizer(true);

  if (virtual) {
    const setSize = virtual.flatItems.length;

    return virtual.virtualItems.map((row) => {
      const item = virtual.flatItems[row.index];

      const style = {
        position: "absolute",
        top: 0,
        left: 0,
        transform: `translateY(${row.start}px)`,
        overflowAnchor: "none",
      } as CSSProperties;

      return item.__group ? (
        <ListboxGroupLabel key={item[fieldNames.label]} item={item} size={size} style={style} />
      ) : (
        <ListboxItem
          key={item[fieldNames.value]}
          item={item}
          size={size}
          disabled={disabled}
          aria-setsize={setSize}
          aria-posinset={item.__index + 1}
          style={style}
        />
      );
    });
  }

  return collection.map((item) => {
    if (item[fieldNames.children]) {
      return (
        <div key={item[fieldNames.label]} role={"group"}>
          <ListboxGroupLabel item={item} size={size} />
          {(item[fieldNames.children] as unknown as ListboxNodeItem<ListboxFieldNames>[]).map((child) => {
            return <ListboxItem key={child[fieldNames.value]} size={size} disabled={disabled} item={child} />;
          })}
        </div>
      );
    } else {
      return <ListboxItem key={item[fieldNames.value]} size={size} disabled={disabled} item={item} />;
    }
  });
};
