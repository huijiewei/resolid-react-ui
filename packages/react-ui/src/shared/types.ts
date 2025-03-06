import type { UseDisclosureOptions } from "../hooks";

export type Orientation = "horizontal" | "vertical";

export type DisclosureProps = UseDisclosureOptions & {
  /**
   * 动画持续时间
   * @default 250
   */
  duration?: number;
};

export type SingleValueProps = {
  /**
   * 是否多选
   * @default false
   */
  multiple?: false;

  /**
   * 受控值
   */
  value?: string | number | null;

  /**
   * 默认值
   * @default null
   */
  defaultValue?: string | number | null;

  /**
   * onChange 回调
   */
  onChange?: (value: string | number | null) => void;
};

export type MultipleValueProps = {
  /**
   * 是否多选
   */
  multiple?: true;

  /**
   * 受控值
   */
  value?: (string | number)[];

  /**
   * 默认值
   * default []
   */
  defaultValue?: (string | number)[];

  /**
   * onChange 回调
   */
  onChange?: (value: (string | number)[]) => void;
};

export type CheckedValueProps = {
  /**
   * 可控值
   */
  checked?: boolean;

  /**
   * 默认值
   * @default false
   */
  defaultChecked?: boolean;

  /**
   * onChange 回调
   */
  onChange?: (checked: boolean) => void;
};

export type FormFieldProps = {
  /**
   * 字段的名称, 提交表单时使用
   */
  name?: string;

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;

  /**
   * 是否必需
   * @default false
   */
  required?: boolean;

  /**
   * 是否只读
   * @default false
   */
  readOnly?: boolean;
};

export type FormInputFieldProps = FormFieldProps & {
  /**
   * 是否无效
   * @default false
   */
  invalid?: boolean;

  /**
   * 占位符文本
   */
  placeholder?: string;

  /**
   * 全宽度
   * @default false
   */
  fullWidth?: boolean;
};
