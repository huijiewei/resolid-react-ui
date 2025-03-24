import type { CSSProperties } from "react";
import { useListboxCollection } from "./listbox-collection-context";
import { useListboxFields } from "./listbox-field-context";
import { ListboxGroupLabel } from "./listbox-group-label";
import { ListboxItem } from "./listbox-item";
import { useListboxState } from "./listbox-state-context";
import { useListboxVirtualizer } from "./listbox-virtualizer-context";
import type { ListboxNodeItem } from "./use-listbox";

export const ListboxList = () => {
  const { size, disabled, readOnly } = useListboxState();
  const { nodeItems } = useListboxCollection();
  const { getItemValue, getItemLabel, getItemChildren } = useListboxFields();

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
        <ListboxGroupLabel key={getItemLabel(item)} group={item} size={size} style={style} />
      ) : (
        <ListboxItem
          key={getItemValue(item)}
          item={item}
          size={size}
          disabled={disabled}
          readOnly={readOnly}
          aria-setsize={setSize}
          aria-posinset={item.__index + 1}
          style={style}
        />
      );
    });
  }

  return nodeItems.map((item) => {
    const children = getItemChildren<ListboxNodeItem>(item);

    if (Array.isArray(children)) {
      return (
        <div key={getItemLabel(item)} role={"group"}>
          <ListboxGroupLabel group={item} size={size} />
          {children.map((child) => {
            return (
              <ListboxItem key={getItemValue(child)} size={size} disabled={disabled} readOnly={readOnly} item={child} />
            );
          })}
        </div>
      );
    } else {
      return <ListboxItem key={getItemValue(item)} size={size} disabled={disabled} readOnly={readOnly} item={item} />;
    }
  });
};
