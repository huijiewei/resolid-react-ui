import { useFloatingRootContext, useInteractions, useRole } from "@floating-ui/react";
import { useState } from "react";
import type { PrimitiveProps } from "../../primitives";
import type { FormFieldProps } from "../../shared/types";
import { tx } from "../../utils";
import { ListboxProvider } from "./listbox-provider";
import { type ListboxBaseProps, useListbox } from "./use-listbox";
import type { defaultFieldNames, ListboxFieldNames } from "./utils";

export type ListboxRootProps<F extends ListboxFieldNames> = FormFieldProps & ListboxBaseProps<F>;

export const ListboxRoot = <F extends ListboxFieldNames = typeof defaultFieldNames>(
  props: PrimitiveProps<"div", ListboxRootProps<F>>,
) => {
  const {
    multiple = false,
    value,
    defaultValue,
    onChange,
    collection,
    fieldNames,
    renderItem,
    renderGroupLabel,
    name,
    disabled = false,
    readOnly = false,
    required = false,
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
    ...providerValue
  } = useListbox({
    multiple,
    value,
    defaultValue,
    onChange,
    collection,
    searchFilter,
    fieldNames,
    context,
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

  const { mergedFieldNames } = providerValue;

  return (
    <div role={"presentation"} className={tx("border-bd-normal rounded-md border", className)} {...rest}>
      <ListboxProvider
        value={{
          ...providerValue,
          floating,
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
          size,
          open: true,
          disabled,
          multiple,
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
              key={item[mergedFieldNames.value]}
              name={`${name}[]`}
              type={"hidden"}
              value={item[mergedFieldNames.value]}
            />
          ))
        ) : (
          <input
            disabled={disabled}
            required={required}
            readOnly={readOnly}
            type={"hidden"}
            name={name}
            value={selectedItems[0]?.[mergedFieldNames.value] ?? ""}
          />
        ))}
    </div>
  );
};
