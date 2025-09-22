import type { KeyboardEvent, MouseEvent } from "react";

export const hasBackgroundClass = (className?: string): boolean => {
  if (!className) {
    return false;
  }

  return className.includes("bg-") && className.split(" ").some((cls) => cls.startsWith("bg-"));
};

export const getInteractiveHandlers = <E extends HTMLElement = HTMLDivElement>({
  disabled,
  typing,
  onClick,
}: {
  disabled: boolean;
  typing: boolean;
  onClick: (e: MouseEvent<E>) => void;
}): {
  handleClick: (e: MouseEvent<E>) => void;
  handleKeyDown: (e: KeyboardEvent) => void;
  handleKeyUp: (e: KeyboardEvent) => void;
} => {
  const handleClick = (e: MouseEvent<E>): void => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    onClick(e);
  };

  const handleKeyDown = (e: KeyboardEvent): void => {
    if (e.target === e.currentTarget && e.key === " ") {
      e.preventDefault();
    }

    if (e.target === e.currentTarget && e.key === "Enter") {
      handleClick(e as unknown as MouseEvent<E>);
    }
  };

  const handleKeyUp = (e: KeyboardEvent): void => {
    if (e.target === e.currentTarget && !typing && e.key === " ") {
      handleClick(e as unknown as MouseEvent<E>);
    }
  };

  return { handleClick, handleKeyDown, handleKeyUp };
};
