import type { KeyboardEvent, MouseEvent } from "react";

export const hasBackgroundClass = (className?: string) => {
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
}) => {
  const handleClick = (e: MouseEvent<E>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    onClick(e);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.target === e.currentTarget && e.key === " ") {
      e.preventDefault();
    }

    if (e.target === e.currentTarget && e.key === "Enter") {
      handleClick(e as unknown as MouseEvent<E>);
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.target === e.currentTarget && !typing && e.key === " ") {
      handleClick(e as unknown as MouseEvent<E>);
    }
  };

  return { handleClick, handleKeyDown, handleKeyUp };
};
