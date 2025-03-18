import { useMergeRefs } from "../../hooks";
import type { PrimitiveProps } from "../../primitives";
import { getInteractiveHandlers } from "../../shared/utils";
import { ariaAttr, dataAttr, tx } from "../../utils";
import { inputHeightStyles, type InputSize, inputSizeStyles } from "../input/input.styles";
import { useListboxFields } from "./listbox-field-context";
import { useListboxItem } from "./listbox-item-context";
import type { ListboxFieldNames, ListboxNodeItem } from "./utils";

type ListboxItemProps = {
  item: ListboxNodeItem<ListboxFieldNames>;
  size: InputSize;
  disabled: boolean;
};

export const ListboxItem = (props: PrimitiveProps<"div", ListboxItemProps, "tabIndex" | "children">) => {
  const { item, size, disabled: disabledProps, ref, className, ...rest } = props;

  const { activeIndex, handleSelect, selectedIndices, getItemProps, typingRef, filterRef, renderItem, elementsRef } =
    useListboxItem();
  const { fieldNames } = useListboxFields();

  const refs = useMergeRefs(ref, (node) => {
    // eslint-disable-next-line react-compiler/react-compiler
    elementsRef.current[item.__index] = node;
  });

  const active = item.__index === activeIndex;
  const selected = selectedIndices.includes(item.__index);
  const disabled = disabledProps || (item[fieldNames.disabled] as unknown as boolean);
  const focusable = activeIndex !== null ? active : selectedIndices.length > 0 ? selected : item.__index === 0;

  const { handleClick, handleKeyUp, handleKeyDown } = getInteractiveHandlers({
    disabled,
    typing: typingRef.current,
    onClick: () => {
      handleSelect(item, item.__index);
    },
  });

  return (
    <div
      ref={refs}
      role="option"
      data-active={dataAttr(active)}
      aria-selected={ariaAttr(selected)}
      aria-disabled={ariaAttr(disabled)}
      tabIndex={!filterRef.current && focusable && !disabled ? 0 : -1}
      className={tx(
        "flex w-full cursor-default items-center rounded-md leading-none outline-none transition-colors",
        disabled ? !selected && "text-fg-subtlest" : "active:bg-bg-subtle",
        inputHeightStyles[size],
        inputSizeStyles[size],
        selected && "text-fg-primary",
        className,
      )}
      {...getItemProps({
        ...rest,
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        onKeyUp: handleKeyUp,
      })}
    >
      {renderItem(item, { active, selected })}
    </div>
  );
};
