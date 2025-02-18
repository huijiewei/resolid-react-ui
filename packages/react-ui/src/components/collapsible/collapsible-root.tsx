import { type CSSProperties, useId } from "react";
import { useDisclosure, useElementTransitionStatus } from "../../hooks";
import type { PrimitiveProps } from "../../primitives";
import type { PopperDisclosureProps } from "../../primitives/popper/popper-disclosure";
import {
  CollapsibleContentContext,
  type CollapsibleContentContextValue,
  CollapsibleTriggerContext,
  type CollapsibleTriggerContextValue,
} from "./collapsible-context";

export type CollapsibleRootProps = PopperDisclosureProps & {
  /**
   * 是否禁用可折叠
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
  const { open, defaultOpen = false, onOpenChange, disabled = false, duration = 250, style, children, ...rest } = props;

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
    mounted: isMounted,
    status,
    duration,
    setElement,
  };

  return (
    <div style={{ ...style, "--dv": `${duration}ms` } as CSSProperties} {...rest}>
      <CollapsibleTriggerContext value={triggerContext}>
        <CollapsibleContentContext value={contentContext}>{children}</CollapsibleContentContext>
      </CollapsibleTriggerContext>
    </div>
  );
};
