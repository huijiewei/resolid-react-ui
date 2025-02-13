import {
  type AriaAttributes,
  type AriaRole,
  type ButtonHTMLAttributes,
  type ComponentProps,
  type ElementType,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type SyntheticEvent,
  useState,
} from "react";

export type UseButtonPropsOptions = {
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  role?: AriaRole;
  disabled?: boolean;
  tabIndex?: number;
};

export type ButtonEvent<E extends SyntheticEvent<Element, Event>> = E & {
  preventButtonHandler: () => void;
};

type GenericButtonProps = Omit<HTMLAttributes<HTMLElement>, "onClick"> & {
  role?: AriaRole;
  tabIndex?: number;
  disabled?: boolean;
  "aria-disabled"?: AriaAttributes["aria-disabled"];
  onClick?: (event: SyntheticEvent) => void;
};

export const useButtonProps = (options: UseButtonPropsOptions) => {
  const { type = "button", role, disabled = false, tabIndex } = options;

  const [tagType, setTagType] = useState<"BUTTON" | "LINK" | null>(null);

  const buttonRef = (node: HTMLElement | null) => {
    if (node) {
      if (node.tagName == "BUTTON") {
        setTagType("BUTTON");
      } else if (node.tagName == "A" && node.getAttribute("href") != null) {
        setTagType("LINK");
      }
    }
  };

  const isNativeButton = tagType == "BUTTON";
  const isNativeLink = tagType == "LINK";

  const buttonProps = {
    type: isNativeButton ? type : undefined,
    role: role ?? (!isNativeButton && !isNativeLink ? "button" : undefined),
    disabled: isNativeButton && disabled ? disabled : undefined,
    tabIndex: tabIndex ?? (!isNativeButton && !isNativeLink && !disabled ? 0 : undefined),
    "aria-disabled": !isNativeButton && disabled ? true : undefined,
  };

  const getButtonProps = (props: GenericButtonProps): GenericButtonProps => {
    const { onClick, ...extProps } = props;

    const internalProps: ComponentProps<ElementType> = {
      ...buttonProps,
      onClick: (e: MouseEvent) => {
        if (!disabled) {
          onClick?.(e);
        }
      },
      onKeyDown: (e: KeyboardEvent) => {
        if (e.target === e.currentTarget && !isNativeButton && e.key === " ") {
          e.preventDefault();
        }

        if (e.target === e.currentTarget && !isNativeButton && !isNativeLink && e.key === "Enter" && !disabled) {
          onClick?.(e);
          e.preventDefault();
        }
      },
      onKeyUp: (e: KeyboardEvent) => {
        if (e.target === e.currentTarget && !isNativeButton && !disabled && e.key === " ") {
          onClick?.(e);
        }
      },
    };

    return Object.entries(extProps).reduce(
      (acc, [key, value]) => {
        if (
          key[0] === "o" &&
          key[1] === "n" &&
          key.charCodeAt(2) >= 65 /* A */ &&
          key.charCodeAt(2) <= 90 /* Z */ &&
          typeof value === "function"
        ) {
          acc[key] = (event: SyntheticEvent) => {
            const extHandler = value;
            const ourHandler = internalProps[key];

            if (event != null && typeof event === "object" && "nativeEvent" in event) {
              let isPrevented = false;

              const buttonEvent = event as ButtonEvent<typeof event>;

              buttonEvent.preventButtonHandler = () => {
                isPrevented = true;
              };

              const result = extHandler(buttonEvent);

              if (!isPrevented) {
                ourHandler?.(buttonEvent);
              }

              return result;
            }

            const result = extHandler(event);

            ourHandler?.(event);

            return result;
          };
        } else if (key === "style") {
          if (value || internalProps.style) {
            acc[key] = { ...internalProps.style, ...(value || {}) };
          }
        } else if (key === "className") {
          if (value) {
            if (internalProps.className) {
              acc[key] = value + " " + internalProps.className;
            } else {
              acc[key] = value;
            }
          } else {
            acc[key] = internalProps.className;
          }
        } else {
          acc[key] = value;
        }

        return acc;
      },
      { ...internalProps },
    );
  };

  return { getButtonProps, buttonRef };
};
