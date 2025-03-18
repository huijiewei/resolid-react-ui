import type { PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";
import type { InputSize } from "../input/input.styles";
import { useListboxGroup } from "./listbox-group-context";
import { listboxGroupLabelStyles } from "./listbox.styles";
import type { ListboxFieldNames, ListboxNodeItem } from "./utils";

type ListboxGroupLabelProps = {
  item: ListboxNodeItem<ListboxFieldNames>;
  size: InputSize;
};

export const ListboxGroupLabel = (props: PrimitiveProps<"div", ListboxGroupLabelProps, "children">) => {
  const { item, size, className, ...rest } = props;

  const { renderGroupLabel } = useListboxGroup();

  return (
    <div
      className={tx(
        "text-fg-subtle flex w-full items-center px-1 text-[0.9em] leading-none",
        listboxGroupLabelStyles[size],
        className,
      )}
      {...rest}
    >
      {renderGroupLabel(item)}
    </div>
  );
};
