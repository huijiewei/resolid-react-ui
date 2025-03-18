import { type FloatingRootContext, useListNavigation, useTypeahead } from "@floating-ui/react";
import { type KeyboardEvent, useMemo, useRef, useState } from "react";
import { useControllableState } from "../../hooks";
import type { MultipleValueProps, SingleValueProps } from "../../shared/types";
import type { InputSize } from "../input/input.styles";
import {
  checkSelected,
  defaultFieldNames,
  type ListboxFieldNames,
  type ListboxFlatItem,
  type ListboxListItem,
  type ListboxNodeItem,
  type ListboxRenderGroupLabel,
  type ListboxRenderItem,
  type ListboxValue,
} from "./utils";

export type ListboxBaseProps<F extends ListboxFieldNames> = (SingleValueProps | MultipleValueProps) & {
  /**
   * 项目的集合
   */
  collection: ListboxListItem<F>[];

  /**
   * 自定义字段映射, 当 `collection` 数据的字段名称与默认值不匹配时使用
   *
   * - `value`    值字段（默认 "value"）
   * - `label`    显示文本字段（默认 "label"）
   * - `disabled` 是否禁用的字段（默认 "disabled"）
   * - `children` 子级数据字段（默认 "children"）
   */
  fieldNames?: F;

  /**
   * 自定义过滤函数
   */
  searchFilter?: (keyword: string, item: ListboxListItem<F>) => boolean;

  /**
   * 自定义项目渲染
   *
   * 参数为 item, status
   */
  renderItem?: ListboxRenderItem<F>;

  /**
   * 自定义组标签渲染
   */
  renderGroupLabel?: ListboxRenderGroupLabel<F>;

  /**
   * 大小
   * @default "md"
   */
  size?: InputSize;
};

export type UseListboxOptions<F extends ListboxFieldNames> = Omit<
  ListboxBaseProps<F>,
  "renderItem" | "renderGroupLabel"
> & {
  context: FloatingRootContext;
  loop?: boolean;
  onSelect?: () => void;
};

export const useListbox = <F extends ListboxFieldNames = typeof defaultFieldNames>(options: UseListboxOptions<F>) => {
  const {
    multiple = false,
    value,
    defaultValue = multiple ? [] : null,
    onChange,
    collection = [],
    fieldNames,
    context,
    loop,
    onSelect,
    searchFilter,
  } = options;

  const mergedFieldNames = {
    value: fieldNames?.value ?? defaultFieldNames.value,
    label: fieldNames?.label ?? defaultFieldNames.label,
    disabled: fieldNames?.disabled ?? defaultFieldNames.disabled,
    children: fieldNames?.children ?? defaultFieldNames.children,
  };

  const [valueState, setValueState] = useControllableState<ListboxValue>({
    value,
    defaultValue,
    onChange: onChange as (value: ListboxValue) => void,
  });

  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const labelsRef = useRef<(string | null)[]>([]);
  const typingRef = useRef(false);
  const filterRef = useRef(false);
  const [filterKeyword, setFilterKeyword] = useState<string>();

  const { nodeItems, indexedItems, selectedItems, selectedIndices } = useMemo(() => {
    const nodeItems: ListboxNodeItem<F>[] = [];
    const indexedItems: ListboxFlatItem<F>[] = [];
    const selectedItems: ListboxFlatItem<F>[] = [];
    const selectedIndices: number[] = [];

    let itemIndex = 0;

    const checkFilter = (item: ListboxListItem<F>) => {
      if (!filterKeyword) {
        return true;
      }

      if (filterKeyword.length == 0) {
        return true;
      }

      return (
        searchFilter ||
        ((keyword, item) =>
          (item[mergedFieldNames.value] as unknown as string | number)
            .toString()
            .toLowerCase()
            .includes(keyword.toLowerCase()))
      )(filterKeyword, item);
    };

    const addItem = (item: ListboxListItem<F>) => {
      const selected = checkSelected(valueState, item, mergedFieldNames.value);

      if (selected) {
        selectedItems.push(item);
        selectedIndices.push(itemIndex);
      }

      if (selected || checkFilter(item)) {
        indexedItems.push(item);
        labelsRef.current[itemIndex] = String(item[mergedFieldNames.value]);

        return true;
      }

      return false;
    };

    for (const item of collection) {
      if (Array.isArray(item[mergedFieldNames.children])) {
        const childrenItems = [];

        for (const child of item[mergedFieldNames.children] as ListboxFlatItem<F>[]) {
          if (addItem(child)) {
            childrenItems.push({ ...child, __index: itemIndex });
            itemIndex++;
          }
        }

        if (childrenItems.length > 0) {
          nodeItems.push({ ...item, [mergedFieldNames.children]: childrenItems, __index: 0 });
        }
      } else {
        if (addItem(item)) {
          nodeItems.push({ ...item, __index: itemIndex });
          itemIndex++;
        }
      }
    }

    return { nodeItems, indexedItems, selectedItems, selectedIndices };
  }, [collection, filterKeyword, mergedFieldNames.children, mergedFieldNames.value, searchFilter, valueState]);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(() => selectedIndices[0] ?? null);
  const [pointer, setPointer] = useState(false);

  const handleSelect = (item: ListboxFlatItem<F>, index: number) => {
    const value = item[mergedFieldNames.value] as unknown as string | number;

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

  const navigationInteraction = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
    loop,
    virtual: !!context.elements.reference || filterRef.current,
  });

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
    mergedFieldNames,
    activeIndex,
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
    setFilterKeyword,
  };
};
