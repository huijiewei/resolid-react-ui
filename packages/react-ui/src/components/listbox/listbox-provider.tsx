import { type HTMLProps, type PropsWithChildren, type ReactNode, useRef } from "react";
import { useIsomorphicEffect, usePrevious } from "../../hooks";
import type { AnyObject } from "../../primitives";
import {
  PopperFloatingContext,
  type PopperFloatingContextValue,
} from "../../primitives/popper/popper-floating-context";
import type { InputSize } from "../input/input.styles";
import { ListboxCollectionContext } from "./listbox-collection-context";
import { ListboxFieldsContext, type ListboxFieldsContextValue } from "./listbox-field-context";
import { ListboxFilterContext } from "./listbox-filter-context";
import { ListboxGroupContext, type ListboxGroupContextValue } from "./listbox-group-context";
import { ListboxItemContext, type ListboxItemContextValue } from "./listbox-item-context";
import { ListboxScrollContext, type VirtualScrollTo } from "./listbox-scroll-context";
import { ListboxStateContext } from "./listbox-state-context";
import type { ListboxBaseProps, ListboxItem, UseListboxResult } from "./use-listbox";

export type ListboxProviderProps<T extends ListboxItem> = {
  value: Omit<
    UseListboxResult<T>,
    | "navigationInteraction"
    | "typeaheadInteraction"
    | "interactiveHandlers"
    | "handleEnterKeydown"
    | "indexedItems"
    | "selectedItems"
    | "setActiveIndex"
  > &
    PopperFloatingContextValue & {
      renderItem?: ListboxBaseProps<T>["renderItem"];
      renderGroupLabel?: ListboxBaseProps<T>["renderGroupLabel"];
      getItemProps: (userProps?: HTMLProps<HTMLElement> | undefined) => AnyObject;
      getNavigationProps: (userProps?: HTMLProps<HTMLElement> | undefined) => AnyObject;
      open: boolean;
      size: InputSize;
      multiple: boolean;
      disabled: boolean;
      readOnly: boolean;
    };
};

export const ListboxProvider = <T extends ListboxItem>(props: PropsWithChildren<ListboxProviderProps<T>>) => {
  const {
    value: {
      getItemValue,
      getItemLabel,
      getItemDisabled,
      getItemChildren,
      childrenKey,
      nodeItems,
      activeIndex,
      selectedIndex,
      selectedIndices,
      elementsRef,
      typingRef,
      handleSelect,
      pointer,
      setFloating,
      getFloatingProps,
      renderGroupLabel = (item) => getItemLabel(item) as ReactNode,
      renderItem = (item) => getItemLabel(item) as ReactNode,
      getItemProps,
      getNavigationProps,
      filterRef,
      virtual,
      setFilterKeyword,
      open,
      size,
      multiple,
      disabled,
      readOnly,
    },
    children,
  } = props;

  const itemContext = {
    activeIndex,
    selectedIndices,
    handleSelect,
    getItemProps,
    renderItem,
    elementsRef,
    typingRef,
    virtual,
  } as ListboxItemContextValue;

  const fieldContext = {
    getItemValue,
    getItemLabel,
    getItemDisabled,
    getItemChildren,
    childrenKey,
  } as ListboxFieldsContextValue;

  const groupContext = {
    renderGroupLabel,
  } as ListboxGroupContextValue;

  const scrollRef = useRef<HTMLElement | null>(null);
  const scrollToRef = useRef<VirtualScrollTo | null>(null);

  const prevActiveIndex = usePrevious<number | null>(activeIndex);

  useIsomorphicEffect(() => {
    if (!open || pointer) {
      return;
    }

    if (prevActiveIndex == null) {
      return;
    }

    if (scrollToRef.current) {
      const scrollIndex = activeIndex ?? selectedIndex;

      if (scrollIndex) {
        scrollToRef.current(scrollIndex > prevActiveIndex ? scrollIndex + 1 : scrollIndex - 1, {
          align: "auto",
        });
      }

      return;
    }

    const floating = scrollRef.current;

    if (floating && floating.offsetHeight < floating.scrollHeight) {
      const item =
        activeIndex != null
          ? elementsRef.current[activeIndex]
          : selectedIndex != null
            ? elementsRef.current[selectedIndex]
            : null;

      if (item) {
        const offsetHeight = elementsRef.current[prevActiveIndex]?.offsetHeight || 0;

        const scrollHeight = floating.offsetHeight;
        const top = item.offsetTop - offsetHeight;
        const bottom = top + offsetHeight * 3;

        if (top < floating.scrollTop) {
          floating.scrollTop -= floating.scrollTop - top + 6;
        } else if (bottom > scrollHeight + floating.scrollTop) {
          floating.scrollTop += bottom - scrollHeight - floating.scrollTop + 6;
        }
      }
    }
  }, [activeIndex, elementsRef, open, pointer, prevActiveIndex, selectedIndex]);

  useIsomorphicEffect(() => {
    if (!open) {
      return;
    }

    requestAnimationFrame(() => {
      if (scrollToRef.current) {
        if (selectedIndex !== null) {
          scrollToRef.current(selectedIndex, { align: "center" });
        }

        return;
      }

      const floating = scrollRef.current;

      if (floating && floating.offsetHeight < floating.scrollHeight) {
        const item = selectedIndex !== null ? elementsRef.current[selectedIndex] : null;

        if (item) {
          floating.scrollTo({
            top: item.offsetTop - floating.offsetHeight / 2 + item.offsetHeight / 2,
          });
        }
      }
    });
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementsRef, open]);

  return (
    <ListboxStateContext value={{ size, multiple, disabled, readOnly }}>
      <ListboxFilterContext value={{ getNavigationProps, filterRef, setFilterKeyword }}>
        <ListboxScrollContext value={{ scrollToRef, scrollRef }}>
          <PopperFloatingContext value={{ setFloating, getFloatingProps }}>
            <ListboxFieldsContext value={fieldContext}>
              <ListboxCollectionContext value={{ nodeItems }}>
                <ListboxGroupContext value={groupContext}>
                  <ListboxItemContext value={itemContext}>{children}</ListboxItemContext>
                </ListboxGroupContext>
              </ListboxCollectionContext>
            </ListboxFieldsContext>
          </PopperFloatingContext>
        </ListboxScrollContext>
      </ListboxFilterContext>
    </ListboxStateContext>
  );
};
