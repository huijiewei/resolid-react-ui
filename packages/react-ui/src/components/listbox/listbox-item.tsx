import type { JSX } from "react/jsx-runtime";
import { useMergeRefs } from "../../hooks";
import type { AnyObject, PrimitiveProps } from "../../primitives";
import { CheckIcon } from "../../shared/icons";
import { getInteractiveHandlers } from "../../shared/utils";
import { ariaAttr, dataAttr, tx } from "../../utils";
import { type InputSize, inputSizeStyles } from "../input/input.styles";
import { useListboxFields } from "./listbox-field-context";
import { useListboxItem } from "./listbox-item-context";
import { listboxItemStyles } from "./listbox.styles";

type ListboxItemProps = {
  item: AnyObject & { __index: number };
  size: InputSize;
  disabled: boolean;
  readOnly: boolean;
};

export const ListboxItem = (props: PrimitiveProps<"div", ListboxItemProps, "tabIndex" | "children">): JSX.Element => {
  const { item, size, disabled: disabledProps, readOnly = false, ref, className, ...rest } = props;

  const {
    activeIndex,
    handleSelect,
    selectedIndices,
    getItemProps,
    typingRef,
    focusItemOnOpen,
    virtual,
    renderItem,
    elementsRef,
  } = useListboxItem();
  const { getItemDisabled } = useListboxFields();

  const refs = useMergeRefs(ref, (node) => {
    elementsRef.current[item.__index] = node;
  });

  const active = item.__index === activeIndex;
  const selected = selectedIndices.includes(item.__index);
  const disabled = disabledProps || getItemDisabled(item);
  const tabIndex = disabled
    ? undefined
    : virtual && focusItemOnOpen === false
      ? -1
      : activeIndex != null
        ? active
          ? 0
          : -1
        : selectedIndices.length > 0
          ? selectedIndices[0] == item.__index
            ? 0
            : -1
          : item.__index == 0
            ? 0
            : -1;

  const { handleClick, handleKeyUp, handleKeyDown } = getInteractiveHandlers({
    disabled: disabled || readOnly,
    typing: typingRef.current,
    onClick: () => {
      handleSelect(item);
    },
  });

  return (
    <div
      ref={refs}
      role="option"
      data-active={dataAttr(active)}
      aria-selected={ariaAttr(selected)}
      aria-disabled={ariaAttr(disabled)}
      className={tx(
        "flex w-full cursor-default items-center justify-between gap-1 rounded-md leading-none outline-none transition-colors",
        disabled ? !selected && "text-fg-subtlest" : "active:bg-bg-subtle",
        listboxItemStyles[size],
        inputSizeStyles[size],
        selected && "text-fg-primary",
        className,
      )}
      {...getItemProps({
        ...rest,
        tabIndex: tabIndex,
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        onKeyUp: handleKeyUp,
      })}
    >
      {renderItem(item, { active, selected })}
      {selected && <CheckIcon />}
    </div>
  );
};
