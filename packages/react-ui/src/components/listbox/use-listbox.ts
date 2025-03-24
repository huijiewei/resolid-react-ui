import { type FloatingRootContext, useListNavigation, useTypeahead } from "@floating-ui/react";
import { type KeyboardEvent, type ReactNode, useCallback, useMemo, useRef, useState } from "react";
import { useControllableState } from "../../hooks";
import type { AnyObject } from "../../primitives";
import type { MultipleValueProps } from "../../shared/types";
import type { InputSize } from "../input/input.styles";

export type ListboxValue = (string | number)[] | string | number | null;
export type ListboxItem = AnyObject;
export type ListboxNodeItem = ListboxItem & { __index: number };
export type ListboxFlatItem = ListboxNodeItem & { __group?: boolean };

export type ListboxBaseProps<T extends ListboxItem> = MultipleValueProps & {
  /**
   * 项目的集合
   */
  collection: T[];

  /**
   * 自定义 `value` 字段名
   * @default "value"
   */
  valueKey?: string;

  /**
   * 自定义 `label` 字段名
   * @default "label"
   */
  labelKey?: string;

  /**
   * 自定义 `disabled` 字段名
   * @default "disabled"
   */
  disabledKey?: string;

  /**
   * 自定义 `children` 字段名
   * @default "children"
   */
  childrenKey?: string;

  /**
   * 自定义过滤函数
   */
  searchFilter?: (keyword: string, item: T) => boolean;

  /**
   * 自定义项目渲染
   */
  renderItem?: (item: T, status: { active: boolean; selected: boolean }) => ReactNode;

  /**
   * 自定义组标签渲染
   */
  renderGroupLabel?: (group: T) => ReactNode;

  /**
   * 大小
   * @default "md"
   */
  size?: InputSize;
};

export type UseListboxOptions<T extends ListboxItem> = Omit<ListboxBaseProps<T>, "renderItem" | "renderGroupLabel"> & {
  context: FloatingRootContext;
  loop?: boolean;
  focusItemOnOpen?: boolean;
  onSelect?: () => void;
};

export type UseListboxResult<T extends ListboxItem> = ReturnType<typeof useListbox<T>>;

export const useListbox = <T extends ListboxItem>(options: UseListboxOptions<T>) => {
  const {
    multiple = false,
    value,
    defaultValue = multiple ? [] : null,
    onChange,
    collection = [],
    valueKey = "value",
    labelKey = "label",
    disabledKey = "disabled",
    childrenKey = "children",
    context,
    loop,
    focusItemOnOpen,
    onSelect,
    searchFilter,
  } = options;

  const [valueState, setValueState] = useControllableState<ListboxValue>({
    value,
    defaultValue,
    onChange: onChange,
  });

  const getItemValue = useCallback(
    (item: T) => {
      return item[valueKey] as string | number;
    },
    [valueKey],
  );

  const getItemLabel = useCallback(
    (item: T) => {
      return item[labelKey] as string;
    },
    [labelKey],
  );

  const getItemDisabled = useCallback(
    (item: T) => {
      return item[disabledKey] as boolean;
    },
    [disabledKey],
  );

  const getItemChildren = useCallback(
    <E = T>(item: T) => {
      return item[childrenKey] as E[] | undefined;
    },
    [childrenKey],
  );

  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const labelsRef = useRef<(string | null)[]>([]);
  const typingRef = useRef(false);
  const filterRef = useRef(false);
  const [filterKeyword, setFilterKeyword] = useState<string>();

  const { nodeItems, indexedItems, selectedItems, selectedIndices } = useMemo(() => {
    const nodeItems: ListboxNodeItem[] = [];
    const indexedItems: T[] = [];
    const selectedItems: T[] = [];
    const selectedIndices: number[] = [];

    let itemIndex = 0;

    const checkFilter = (item: T) => {
      if (!filterKeyword) {
        return true;
      }

      if (filterKeyword.length == 0) {
        return true;
      }

      return (
        searchFilter || ((keyword, item) => getItemValue(item).toString().toLowerCase().includes(keyword.toLowerCase()))
      )(filterKeyword, item);
    };

    const addItem = (item: T) => {
      const value = getItemValue(item);

      const selected = Array.isArray(valueState) ? valueState.includes(value) : valueState == value;

      if (selected) {
        selectedItems.push(item);
        selectedIndices.push(itemIndex);
      }

      if (selected || checkFilter(item)) {
        indexedItems.push(item);
        labelsRef.current[itemIndex] = String(value);

        return true;
      }

      return false;
    };

    for (const item of collection) {
      const children = getItemChildren(item);

      if (Array.isArray(children)) {
        const childrenItems = [];

        for (const child of children) {
          if (addItem(child)) {
            childrenItems.push({ ...child, __index: itemIndex });
            itemIndex++;
          }
        }

        if (childrenItems.length > 0) {
          nodeItems.push({ ...item, [childrenKey]: childrenItems, __index: 0 });
        }
      } else {
        if (addItem(item)) {
          nodeItems.push({ ...item, __index: itemIndex });
          itemIndex++;
        }
      }
    }

    return { nodeItems, indexedItems, selectedItems, selectedIndices };
  }, [childrenKey, collection, filterKeyword, getItemChildren, getItemValue, searchFilter, valueState]);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(() => selectedIndices[0] ?? null);
  const [pointer, setPointer] = useState(false);

  const handleSelect = (item: T, index: number) => {
    const value = getItemValue(item);

    if (Array.isArray(valueState)) {
      if (valueState.includes(value)) {
        setValueState(valueState.filter((p) => p != value));
        setSelectedIndex(null);
      } else {
        setValueState([...valueState, value]);
        setSelectedIndex(index);
      }
    } else {
      if (value == valueState) {
        setValueState(null);
        setSelectedIndex(null);
      } else {
        setValueState(value);
        setSelectedIndex(index);
      }
    }

    onSelect?.();
  };

  const virtual = !!context.elements.reference || filterRef.current;

  const navigationInteraction = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
    loop,
    focusItemOnOpen: focusItemOnOpen ?? "auto",
    virtual,
  });

  // noinspection JSUnusedGlobalSymbols
  const typeaheadInteraction = useTypeahead(context, {
    listRef: labelsRef,
    activeIndex,
    selectedIndex,
    resetMs: 500,
    onMatch: (index) => {
      if (index !== activeIndex) {
        setActiveIndex(index);
      }
    },
    onTypingChange: (nextTyping) => {
      typingRef.current = nextTyping;
    },
  });

  const handleEnterKeydown = (e: KeyboardEvent<HTMLElement>) => {
    if (activeIndex != null && e.key == "Enter") {
      handleSelect(indexedItems[activeIndex], activeIndex);
    }
  };

  // noinspection JSUnusedGlobalSymbols
  const interactiveHandlers = {
    onPointerMove: () => {
      setPointer(true);
    },
    onKeyDown: (e: KeyboardEvent<HTMLElement>) => {
      setPointer(false);

      handleEnterKeydown(e);

      if (e.key == " " && !typingRef.current) {
        e.preventDefault();
      }
    },
    onKeyUp: (e: KeyboardEvent<HTMLElement>) => {
      if (activeIndex != null && e.key == " " && !typingRef.current) {
        handleSelect(indexedItems[activeIndex], activeIndex);
      }
    },
  };

  return {
    getItemValue,
    getItemLabel,
    getItemDisabled,
    getItemChildren,
    childrenKey,
    activeIndex,
    setActiveIndex,
    selectedIndex,
    nodeItems,
    selectedItems,
    selectedIndices,
    handleSelect,
    navigationInteraction,
    typeaheadInteraction,
    pointer,
    interactiveHandlers,
    handleEnterKeydown,
    elementsRef,
    typingRef,
    filterRef,
    virtual,
    setFilterKeyword,
  };
};
