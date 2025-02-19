import { createSafeContext } from "../index";

export type MenuRadioGroupContextValue = {
  /**
   * 要选中的菜单单选项目的控制值
   */
  value?: string | number;

  /**
   * 值更改时调用的事件处理程序
   */
  onChange?: (value: string | number) => void;
};

export const [MenuRadioGroupContext, useMenuRadioGroup] = createSafeContext<MenuRadioGroupContextValue>({
  name: "MenuRadioGroupContext",
});
