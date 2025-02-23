export type Orientation = "horizontal" | "vertical";

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
