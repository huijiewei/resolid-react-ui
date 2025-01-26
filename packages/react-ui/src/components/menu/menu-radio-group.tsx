import { useCallbackRef } from "../../hooks";
import type { PrimitiveProps } from "../../primitives";
import { MenuGroup } from "./menu-group";
import { MenuRadioGroupContext, type MenuRadioGroupContextValue } from "./menu-radio-group-context";

export type MenuRadioGroupProps = MenuRadioGroupContextValue;

export const MenuRadioGroup = (props: PrimitiveProps<"div", MenuRadioGroupProps>) => {
  const { value, onChange, ...rest } = props;

  const handleChange = useCallbackRef(onChange);

  const contextValue: MenuRadioGroupContextValue = {
    value,
    onChange: handleChange,
  };

  return (
    <MenuRadioGroupContext value={contextValue}>
      <MenuGroup {...rest} />
    </MenuRadioGroupContext>
  );
};
