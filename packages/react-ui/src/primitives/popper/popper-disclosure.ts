export type PopperDisclosureProps = {
  /**
   * 受控打开状态
   */
  open?: boolean;

  /**
   * 初始渲染时的默认打开状态
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * 打开状态改变时调用的事件处理程序
   */
  onOpenChange?: (open: boolean) => void;
};
