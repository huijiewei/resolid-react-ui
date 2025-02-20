import type { AriaRole, ButtonHTMLAttributes } from "react";

export type UseButtonPropsOptions = {
  hasRender: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  role?: AriaRole;
  disabled?: boolean;
  tabIndex?: number;
};

export const useButtonProps = (options: UseButtonPropsOptions) => {
  const { hasRender, type = "button", role, disabled = false, tabIndex } = options;

  return {
    type: !hasRender ? type : undefined,
    role: role && role !== "button" ? role : hasRender ? "button" : undefined,
    disabled: !hasRender && disabled ? disabled : undefined,
    tabIndex: tabIndex ?? (hasRender && !disabled ? 0 : undefined),
    "aria-disabled": hasRender && disabled ? true : undefined,
  };
};
