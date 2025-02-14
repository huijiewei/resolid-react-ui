import {
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

export type ButtonEvent<E extends SyntheticEvent> = E & {
  preventButtonHandler: () => void;
};

export const useButtonProps = <T extends HTMLElement>(options: UseButtonPropsOptions) => {
  const { type = "button", role, disabled = false, tabIndex } = options;

  const [tagType, setTagType] = useState<"BUTTON" | "LINK" | null>(null);

  const buttonRef = (node: T | null) => {
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

  const getButtonProps = (props: HTMLAttributes<T>) => {
    const { onClick, ...extProps } = props;

    const internalProps: ComponentProps<ElementType> = {
      ...buttonProps,
      onClick: (e: MouseEvent<T>) => {
        if (!disabled) {
          onClick?.(e);
        }
      },
      onKeyDown: (e: KeyboardEvent<T>) => {
        if (e.target === e.currentTarget && !isNativeButton && e.key === " ") {
          e.preventDefault();
        }

        if (e.target === e.currentTarget && !isNativeButton && !isNativeLink && e.key === "Enter" && !disabled) {
          onClick?.(e as unknown as MouseEvent<T>);
          e.preventDefault();
        }
      },
      onKeyUp: (e: KeyboardEvent<T>) => {
        if (e.target === e.currentTarget && !isNativeButton && !disabled && e.key === " ") {
          onClick?.(e as unknown as MouseEvent<T>);
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
          acc[key] = (e: SyntheticEvent<T>) => {
            const extHandler = value;
            const ourHandler = internalProps[key];

            if (e != null && typeof e === "object" && "nativeEvent" in e) {
              let isPrevented = false;

              const buttonEvent = e as ButtonEvent<typeof e>;

              buttonEvent.preventButtonHandler = () => {
                isPrevented = true;
              };

              const result = extHandler(buttonEvent);

              if (!isPrevented) {
                ourHandler?.(buttonEvent);
              }

              return result;
            }

            const result = extHandler(e);

            ourHandler?.(e);

            return result;
          };
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
