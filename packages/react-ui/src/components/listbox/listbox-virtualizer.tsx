import { omit } from "@resolid/utils";
import { useVirtualizer } from "@tanstack/react-virtual";
import { type PropsWithChildren, useMemo } from "react";
import type { JSX } from "react/jsx-runtime";
import { useIsomorphicEffect } from "../../hooks";
import { usePopperFloating } from "../../primitives/popper/popper-floating-context";
import { useListboxCollection } from "./listbox-collection-context";
import { useListboxFields } from "./listbox-field-context";
import { useListboxScroll } from "./listbox-scroll-context";
import { useListboxState } from "./listbox-state-context";
import { ListboxVirtualizerContext } from "./listbox-virtualizer-context";
import { listboxGroupLabelHeights, listboxItemHeights } from "./listbox.styles";
import type { ListboxFlatItem, ListboxNodeItem } from "./use-listbox";

export type ListboxVirtualizerProps = {
  /**
   * 项目的高度（以像素为单位）
   */
  itemHeight?: number;

  /**
   * 分组标签的高度（以像素为单位）
   */
  groupLabelHeight?: number;

  /**
   * 在可见区域上方和下方渲染的项目数
   * @default 3
   */
  overscan?: number;

  /**
   * 应用于虚拟器开始处的填充（以像素为单位）
   * @default 4
   */
  paddingStart?: number;

  /**
   * 应用于虚拟器末尾的填充（以像素为单位）
   * @default 4
   */
  paddingEnd?: number;

  /**
   * 滚动到元素时应用于虚拟器开始处的填充（以像素为单位）
   * @default 17
   */
  scrollPaddingStart?: number;

  /**
   * 滚动到元素时应用于虚拟器末尾的填充（以像素为单位）
   * @default 17
   */
  scrollPaddingEnd?: number;

  /**
   * 虚拟化列表中项目之间的间距
   */
  gap?: number;

  /**
   * 将 ResizeObserver 封装在 requestAnimationFrame 中，实现更顺畅的更新并减少布局抖动
   * @default false
   */
  useAnimationFrameWithResizeObserver?: boolean;
};

export const ListboxVirtualizer = ({
  itemHeight,
  groupLabelHeight,
  overscan = 3,
  paddingStart = 4,
  paddingEnd = 4,
  scrollPaddingStart = 4,
  scrollPaddingEnd = 4,
  gap,
  useAnimationFrameWithResizeObserver = false,
  children,
}: PropsWithChildren<ListboxVirtualizerProps>): JSX.Element => {
  const { size } = useListboxState();
  const { getFloatingProps } = usePopperFloating();
  const { nodeItems } = useListboxCollection();
  const { getItemChildren, childrenKey } = useListboxFields();
  const { scrollToRef, scrollRef } = useListboxScroll();

  const { flatItems, groupLabelIndices, groupIndices } = useMemo(() => {
    const flatItems: ListboxFlatItem[] = [];
    const groupLabelIndices: number[] = [];
    const groupIndices: number[] = [];

    let itemIndex = 0;
    let groupIndex = 0;

    for (const item of nodeItems) {
      const children = getItemChildren<ListboxNodeItem>(item);

      if (Array.isArray(children)) {
        groupLabelIndices.push(itemIndex);
        groupIndices.push(groupIndex);

        flatItems.push({ ...(omit(item, [childrenKey]) as ListboxNodeItem), __group: true });
        itemIndex++;

        for (const child of children) {
          flatItems.push(child);
          itemIndex++;
          groupIndex++;
        }
      } else {
        flatItems.push(item);
        itemIndex++;
        groupIndex++;
      }
    }

    return { flatItems, groupLabelIndices, groupIndices };
  }, [childrenKey, nodeItems, getItemChildren]);

  const virtual = useVirtualizer({
    count: flatItems.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: (index) => {
      return groupLabelIndices.includes(index)
        ? (groupLabelHeight ?? listboxGroupLabelHeights[size])
        : (itemHeight ?? listboxItemHeights[size]);
    },
    overscan,
    paddingStart,
    paddingEnd,
    scrollPaddingStart,
    scrollPaddingEnd,
    gap,
    useAnimationFrameWithResizeObserver,
  });

  useIsomorphicEffect(() => {
    scrollToRef.current = (index, options) => {
      const groupCount = groupIndices.reduce((acc, num) => acc + (num <= index ? 1 : 0), 0);

      virtual.scrollToIndex(index > 0 ? index + groupCount : 0, options);
    };
  }, [groupIndices, scrollToRef, virtual]);

  return (
    <div
      className={"relative w-full outline-none"}
      style={{ height: `${virtual.getTotalSize()}px` }}
      {...getFloatingProps()}
    >
      <ListboxVirtualizerContext value={{ virtualItems: virtual.getVirtualItems(), flatItems }}>
        {children}
      </ListboxVirtualizerContext>
    </div>
  );
};
