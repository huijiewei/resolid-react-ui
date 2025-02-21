import { type CSSProperties, useId } from "react";
import { useDisclosure, type UseDisclosureOptions, useElementTransitionStatus } from "../../hooks";
import type { PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";
import {
  CollapsibleContentContext,
  type CollapsibleContentContextValue,
  CollapsibleTriggerContext,
  type CollapsibleTriggerContextValue,
} from "./collapsible-context";

export type CollapsibleRootProps = UseDisclosureOptions & {
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;

  /**
   * 动画持续时间
   * @default 250
   */
  duration?: number;
};

export const CollapsibleRoot = (props: PrimitiveProps<"div", CollapsibleRootProps>) => {
  const {
    open,
    defaultOpen = false,
    onOpenChange,
    disabled = false,
    duration = 250,
    style,
    children,
    className,
    ...rest
  } = props;

  const [openState, { handleToggle }] = useDisclosure({ open, defaultOpen, onOpenChange });

  const id = useId();

  const { isMounted, status, setElement } = useElementTransitionStatus(openState, { duration });

  const triggerContext: CollapsibleTriggerContextValue = {
    id,
    open: openState,
    toggle: handleToggle,
    disabled,
  };
  const contentContext: CollapsibleContentContextValue = {
    id,
    open: openState,
    mounted: isMounted,
    status,
    duration,
    setElement,
  };

  return (
    <div
      style={{ ...style, "--dv": `${duration}ms` } as CSSProperties}
      className={tx(disabled && "opacity-60", className)}
      {...rest}
    >
      <CollapsibleTriggerContext value={triggerContext}>
        <CollapsibleContentContext value={contentContext}>{children}</CollapsibleContentContext>
      </CollapsibleTriggerContext>
    </div>
  );
};
