import { useFloatingRootContext, useInteractions, useRole } from "@floating-ui/react";
import { useState, type FocusEvent } from "react";
import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import type { FormFieldProps } from "../../shared/types";
import { ariaAttr, tx } from "../../utils";
import { ListboxProvider } from "./listbox-provider";
import { useListbox, type ListboxBaseProps, type ListboxItem } from "./use-listbox";

export type ListboxRootProps<T extends ListboxItem> = FormFieldProps & {
  /**
   * 是否无效
   * @default false
   */
  invalid?: boolean;
} & ListboxBaseProps<T>;

export const ListboxRoot = <T extends ListboxItem>(props: PrimitiveProps<"div", ListboxRootProps<T>>): JSX.Element => {
  const {
    multiple = false,
    value,
    defaultValue,
    onChange,
    collection,
    valueKey,
    labelKey,
    disabledKey,
    childrenKey,
    renderItem,
    renderGroupLabel,
    name,
    disabled = false,
    readOnly = false,
    required = false,
    invalid = false,
    size = "md",
    searchFilter,
    className,
    children,
    ...rest
  } = props;

  const [floating, setFloating] = useState<HTMLElement | null>(null);

  const context = useFloatingRootContext({ open: true, elements: { floating: floating, reference: null } });

  const {
    selectedItems,
    navigationInteraction,
    typeaheadInteraction,
    interactiveHandlers,
    handleEnterKeydown,
    activeIndex,
    setActiveIndex,
    selectedIndices,
    ...providerValue
  } = useListbox({
    disabled,
    readOnly,
    multiple,
    value,
    defaultValue,
    onChange,
    collection,
    searchFilter,
    valueKey,
    labelKey,
    disabledKey,
    childrenKey,
    context,
    focusItemOnOpen: false,
  });

  const { getFloatingProps, getItemProps } = useInteractions([
    useRole(context, { role: "listbox" }),
    typeaheadInteraction,
  ]);

  const {
    getFloatingProps: getNavigationFloatingProps,
    getReferenceProps: getNavigationProps,
    getItemProps: getNavigationItemProps,
  } = useInteractions([navigationInteraction]);

  const handleBlur = (e: FocusEvent<HTMLElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setActiveIndex(null);
    }
  };

  const handleFocus = () => {
    if (activeIndex == null) {
      setActiveIndex(selectedIndices[0] ?? 0);
    }
  };

  return (
    <div
      role={"presentation"}
      className={tx("rounded-md border", invalid ? "border-bd-invalid" : "border-bd-normal", className)}
      onBlur={handleBlur}
      onFocus={handleFocus}
      {...rest}
    >
      <ListboxProvider
        value={{
          ...providerValue,
          activeIndex,
          selectedIndices,
          setFloating,
          getFloatingProps: (props) =>
            getFloatingProps(
              getNavigationFloatingProps({
                ...props,
                ...interactiveHandlers,
              }),
            ),
          renderItem,
          renderGroupLabel,
          getNavigationProps: (props) =>
            getNavigationProps({
              ...props,
              onKeyDown: handleEnterKeydown,
            }),
          getItemProps: (props) => getItemProps(getNavigationItemProps(props)),
          open: true,
          size,
          multiple,
          disabled,
          readOnly,
        }}
      >
        {children}
      </ListboxProvider>
      {name &&
        (multiple ? (
          selectedItems.map((item) => (
            <input
              disabled={disabled}
              required={required}
              readOnly={readOnly}
              aria-invalid={ariaAttr(invalid)}
              key={providerValue.getItemValue(item)}
              name={`${name}[]`}
              type={"hidden"}
              value={providerValue.getItemLabel(item)}
            />
          ))
        ) : (
          <input
            disabled={disabled}
            required={required}
            readOnly={readOnly}
            aria-invalid={ariaAttr(invalid)}
            type={"hidden"}
            name={name}
            value={selectedItems.length > 0 ? providerValue.getItemValue(selectedItems[0]) : ""}
          />
        ))}
    </div>
  );
};
