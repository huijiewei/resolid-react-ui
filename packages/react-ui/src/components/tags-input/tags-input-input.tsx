import { useListItem } from "@floating-ui/react";
import type { ChangeEvent, ClipboardEvent, FocusEvent, KeyboardEvent, SyntheticEvent } from "react";
import type { JSX } from "react/jsx-runtime";
import { useControllableState, useMergeRefs } from "../../hooks";
import type { PrimitiveProps } from "../../primitives";
import { useComposite } from "../../primitives/composite/composite-context";
import { tx } from "../../utils";
import { useTagsInputRoot } from "./tags-input-root-context";

export type TagsInputInputProps = {
  /**
   * 可控值
   */
  value?: string;

  /**
   * 输入框值
   * @default ""
   */
  defaultValue?: string;

  /**
   * onChange 回调
   */
  onChange?: (value: string) => void;

  /**
   * 占位符文本
   */
  placeholder?: string;

  /**
   * 允许的最大字符数
   */
  maxLength?: number;
};

export const TagsInputInput = (
  props: PrimitiveProps<
    "input",
    TagsInputInputProps,
    "type" | "tabIndex" | "placeholder" | "maxLength" | "autoComplete" | "autoCorrect" | "autoCapitalize"
  >,
): JSX.Element => {
  const {
    value,
    defaultValue = "",
    onChange,
    placeholder,
    maxLength,
    className,
    onKeyDown,
    onInput,
    onFocus,
    onBlur,
    ref,
    ...rest
  } = props;

  const { disabled, readOnly, addOnBlur, addOnPaste, inputClassname, delimiter, onAdd, onDelete } = useTagsInputRoot();

  const { ref: itemRef, index } = useListItem();
  const { activeIndex, setActiveIndex } = useComposite();
  const [valueState, setValueState] = useControllableState({
    value,
    defaultValue,
    onChange,
  });

  const refs = useMergeRefs(ref, itemRef);

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    onBlur?.(e);

    if (addOnBlur) {
      if (e.target.value && onAdd(e.target.value)) {
        setValueState("");
      }
    }

    setActiveIndex(undefined);
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    onFocus?.(e);
    setActiveIndex(index);
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    if (!addOnPaste) {
      return;
    }

    e.preventDefault();

    if (!e.clipboardData) {
      return;
    }

    const text = e.clipboardData.getData("text").trim();

    if (!text) {
      return;
    }

    if (delimiter) {
      onAdd(
        text
          .split(delimiter)
          .map((v) => v.trim())
          .filter(Boolean),
      );
    } else {
      onAdd(text);
    }
  };

  const handleInput = (e: SyntheticEvent<HTMLInputElement, InputEvent>) => {
    onInput?.(e);

    if (!e.nativeEvent.data) {
      return;
    }

    if (e.nativeEvent.data == delimiter || (delimiter instanceof RegExp && delimiter.test(e.nativeEvent.data))) {
      const value = e.currentTarget.value.replaceAll(delimiter, "").trim();

      if (value && onAdd(value)) {
        e.currentTarget.value = "";
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(e);

    if (e.defaultPrevented) {
      return;
    }

    if (e.nativeEvent.isComposing) {
      return;
    }

    if (e.key == "ArrowLeft") {
      if (e.currentTarget.selectionStart != 0) {
        e.stopPropagation();
      }

      return;
    }

    if (e.key == "Enter") {
      if (!e.currentTarget.value) {
        return;
      }

      const value = e.currentTarget.value.trim();

      if (!value) {
        return;
      }

      if (onAdd(value)) {
        setValueState("");
      }

      e.preventDefault();

      return;
    }

    if (e.key == "Delete" || e.key == "Backspace") {
      if (e.currentTarget.selectionStart !== 0 || e.currentTarget.selectionEnd !== 0) {
        return;
      }

      if (activeIndex != undefined && activeIndex < index) {
        onDelete(activeIndex);
      }

      if (e.key == "Backspace") {
        setActiveIndex((idx) => (idx ? idx - 1 : index));
      }

      return;
    }

    setActiveIndex(index);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValueState(e.currentTarget.value);
  };

  return (
    <input
      ref={refs}
      type={"text"}
      autoComplete={"off"}
      autoCapitalize={"off"}
      autoCorrect={"off"}
      disabled={disabled}
      readOnly={readOnly}
      placeholder={placeholder}
      maxLength={maxLength}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onPaste={handlePaste}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      className={tx("min-w-20 flex-1 outline-none", inputClassname, className)}
      value={valueState}
      {...rest}
    />
  );
};
