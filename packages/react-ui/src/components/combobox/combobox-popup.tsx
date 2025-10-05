import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  offset,
  type Placement,
  size,
  useFloating,
  useTransitionStatus,
} from "@floating-ui/react";
import type { JSX } from "react/jsx-runtime";
import { useMergeRefs } from "../../hooks";
import type { PrimitiveProps } from "../../primitives";
import { PopperPositioner } from "../../primitives/popper/popper-positioner";
import {
  PopperPositionerContext,
  type PopperPositionerContextValue,
} from "../../primitives/popper/popper-positioner-context";
import { getPopperAnimationProps } from "../../primitives/popper/utils";
import { tx } from "../../utils";
import { Portal } from "../portal/portal";
import { useComboboxPopup } from "./combobox-popup-context";
import { useComboboxRoot } from "./combobox-root-context";

export type ComboboxPopupProps = {
  /**
   * 放置位置
   * @default "bottom"
   */
  placement?: Placement;
};

export const ComboboxPopup = (props: PrimitiveProps<"div", ComboboxPopupProps>): JSX.Element | null => {
  const { children, style, className, placement = "bottom", ref, ...rest } = props;

  const { rootContext } = useComboboxRoot();
  const { duration, setFloating } = useComboboxPopup();

  const { floatingStyles, context } = useFloating({
    rootContext,
    middleware: [
      offset(6),
      flip(),
      size({
        apply({ availableWidth, elements, rects }) {
          Object.assign(elements.floating.style, {
            maxWidth: `${availableWidth}px`,
            minWidth: `${rects.reference.width}px`,
          });
        },
      }),
    ],
    placement,
    whileElementsMounted: autoUpdate,
  });

  const { isMounted, status } = useTransitionStatus(context, {
    duration,
  });

  const refs = useMergeRefs(ref, setFloating);

  const positionerContext: PopperPositionerContextValue = {
    setPositioner: refs,
    positionerStyles: floatingStyles,
  };

  const animationProps = getPopperAnimationProps({ status, duration });

  if (!isMounted) {
    return null;
  }

  return (
    <Portal>
      <PopperPositionerContext value={positionerContext}>
        <PopperPositioner
          style={{ ...style, ...animationProps.style }}
          className={tx(
            "border-bd-normal bg-bg-normal rounded-md border shadow-sm",
            animationProps.className,
            className,
          )}
          tabIndex={-1}
          {...rest}
        >
          <FloatingFocusManager
            disabled={!rootContext.open}
            context={rootContext}
            initialFocus={-1}
            returnFocus={false}
            visuallyHiddenDismiss={"关闭"}
          >
            <>{children}</>
          </FloatingFocusManager>
        </PopperPositioner>
      </PopperPositionerContext>
    </Portal>
  );
};
