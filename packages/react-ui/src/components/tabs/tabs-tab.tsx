import { useListItem } from "@floating-ui/react";
import type { FocusEvent, MouseEvent } from "react";
import { useButtonProps, useIsomorphicEffect, useMergeRefs } from "../../hooks";
import { Polymorphic, type PolymorphicProps } from "../../primitives";
import { ariaAttr, dataAttr, tx } from "../../utils";
import { getPanelId, getTabId, useTabs } from "./tabs-context";
import { useTabsList } from "./tabs-list-context";

type TabsTabProps = {
  /**
   * 将内容与触发器关联起来的唯一值
   */
  value: string;

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
};

export const TabsTab = (props: PolymorphicProps<"button", TabsTabProps, "type" | "role" | "id" | "tabIndex">) => {
  const { render, value, disabled = false, children, className, onClick, onFocus, ref, ...rest } = props;

  const { baseId, selectedValue, setSelectedValue, orientation } = useTabs();
  const { ref: itemRef, index } = useListItem();
  const { activeIndex, setActiveIndex } = useTabsList();

  const tabId = getTabId(baseId, value);
  const panelId = getPanelId(baseId, value);
  const selected = selectedValue === value;

  useIsomorphicEffect(() => {
    if (selected && activeIndex !== index) {
      setActiveIndex(index);
    }
  }, [activeIndex, index, selected, setActiveIndex]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    onClick?.(e);

    setActiveIndex(index);
    setSelectedValue(value);
  };

  const handleFocus = (e: FocusEvent<HTMLButtonElement>) => {
    onFocus?.(e);
    setSelectedValue(value);
  };

  const buttonProps = useButtonProps({
    hasRender: !!render,
    role: "tab",
    disabled,
    tabIndex: selected ? 0 : -1,
  });

  const refs = useMergeRefs(ref, itemRef);

  return (
    <Polymorphic<"button">
      as={"button"}
      render={render}
      ref={refs}
      {...buttonProps}
      id={tabId}
      aria-controls={panelId}
      aria-selected={ariaAttr(selected)}
      data-active={dataAttr(selected)}
      data-orientation={orientation}
      className={tx(orientation == "horizontal" ? "-mb-px" : "-me-px", disabled && "opacity-60", className)}
      onClick={handleClick}
      onFocus={handleFocus}
      {...rest}
    >
      {children}
    </Polymorphic>
  );
};
