import type { PrimitiveProps } from "../../primitives";
import { MenuGroup } from "./menu-group";
import { MenuRadioGroupContext, type MenuRadioGroupContextValue } from "./menu-radio-group-context";

export type MenuRadioGroupProps = MenuRadioGroupContextValue;

export const MenuRadioGroup = (props: PrimitiveProps<"div", MenuRadioGroupProps>) => {
  const { value, onChange, ...rest } = props;

  const contextValue: MenuRadioGroupContextValue = {
    value,
    onChange,
  };

  return (
    <MenuRadioGroupContext value={contextValue}>
      <MenuGroup {...rest} />
    </MenuRadioGroupContext>
  );
};
