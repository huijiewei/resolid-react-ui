import { createSafeContext } from "../../primitives";

export type TagsInputBaseProps = {
  /**
   * 触发新标签添加的字符或者正则
   * @default ","
   */
  delimiter?: string | RegExp;

  /**
   * 输入框失去焦点时是否添加标签
   * @default false
   */
  addOnBlur?: boolean;

  /**
   * 粘贴到输入框时是否添加标签
   * @default false
   */
  addOnPaste?: boolean;
};

export type TagsInputRootContextValue = TagsInputBaseProps & {
  disabled: boolean;
  readOnly: boolean;
  inputClassname: string;
  onAdd: (value: string | string[]) => boolean;
  onDelete: (index: number) => void;
};

export const [TagsInputRootContext, useTagsInputRoot] = createSafeContext<TagsInputRootContextValue>({
  name: "TagsInputRootContext",
});
