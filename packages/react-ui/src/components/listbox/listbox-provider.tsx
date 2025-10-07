import { type HTMLProps, type PropsWithChildren, type ReactNode, useEffectEvent, useRef } from "react";
import type { JSX } from "react/jsx-runtime";
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
      virtual?: boolean;
      focusItemOnOpen?: boolean;
      open: boolean;
      size: InputSize;
      multiple: boolean;
      disabled: boolean;
      readOnly: boolean;
    };
};

export const ListboxProvider = <T extends ListboxItem>(
  props: PropsWithChildren<ListboxProviderProps<T>>,
): JSX.Element => {
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
      filterInputRef,
      setFilterKeyword,
      open,
      size,
      multiple,
      disabled,
      readOnly,
      focusItemOnOpen,
      virtual,
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
    focusItemOnOpen,
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

  // 滚动
  const scrollRef = useRef<HTMLElement | null>(null);
  // 虚拟滚动
  const scrollToRef = useRef<VirtualScrollTo | null>(null);

  const prevActiveIndex = usePrevious<number | null>(activeIndex);

  const scrollEvent = useEffectEvent((prevActiveIndex: number) => {
    if (scrollToRef.current) {
      const scrollIndex = activeIndex ?? selectedIndex;

      if (scrollIndex) {
        scrollToRef.current(scrollIndex > prevActiveIndex ? scrollIndex + 1 : scrollIndex - 1, {
          align: "auto",
        });
      }
    } else {
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
    }
  });

  useIsomorphicEffect(() => {
    if (!open || pointer) {
      return;
    }

    if (prevActiveIndex == null) {
      return;
    }

    scrollEvent(prevActiveIndex);
  }, [open, pointer, prevActiveIndex]);

  const initScrollEvent = useEffectEvent(() => {
    requestAnimationFrame(() => {
      if (scrollToRef.current) {
        if (selectedIndex !== null) {
          scrollToRef.current(selectedIndex, { align: "center" });
        }
      } else {
        const floating = scrollRef.current;

        if (floating && floating.offsetHeight < floating.scrollHeight) {
          const item = selectedIndex !== null ? elementsRef.current[selectedIndex] : null;

          if (item) {
            floating.scrollTop = item.offsetTop - floating.offsetHeight / 2 + item.offsetHeight / 2;
          }
        }
      }
    });
  });

  useIsomorphicEffect(() => {
    if (!open) {
      return;
    }

    initScrollEvent();
  }, [open]);

  return (
    <ListboxStateContext value={{ size, multiple, disabled, readOnly }}>
      <ListboxFilterContext value={{ getNavigationProps, filterInputRef, setFilterKeyword }}>
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
