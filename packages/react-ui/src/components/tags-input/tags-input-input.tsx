import { useListItem } from "@floating-ui/react";
import type { ChangeEvent, ClipboardEvent, FocusEvent, KeyboardEvent, SyntheticEvent } from "react";
import { useControllableState, useMergeRefs } from "../../hooks";
import type { PrimitiveProps } from "../../primitives";
import { useComposite } from "../../primitives/composite/composite-context";
import { tx } from "../../utils";

type TagsInputInputProps = {
  delimiter: string | RegExp;
  addOnBlur: boolean;
  addOnPaste: boolean;
  onAdd: (value: string | string[]) => boolean;
  onDelete: (index: number) => void;
  value: string | undefined;
  onChange?: (value: string) => void;
};

export const TagsInputInput = (props: PrimitiveProps<"input", TagsInputInputProps, "type" | "tabIndex">) => {
  const { className, onFocus, delimiter, addOnBlur, addOnPaste, onAdd, onDelete, value, onChange, ref, ...rest } =
    props;

  const { ref: itemRef, index } = useListItem();
  const { activeIndex, setActiveIndex } = useComposite();
  const [valueState, setValueState] = useControllableState({ value, defaultValue: "", onChange });

  const refs = useMergeRefs(ref, itemRef);

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (addOnBlur) {
      if (e.target.value && onAdd(e.target.value)) {
        setValueState("");
      }
    }

    setActiveIndex(undefined);
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setActiveIndex(index);

    onFocus?.(e);
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
    if (!e.nativeEvent.data) {
      return;
    }

    if (e.nativeEvent.data == delimiter || (delimiter instanceof RegExp && delimiter.test(e.nativeEvent.data))) {
      const value = e.currentTarget.value.replaceAll(delimiter, "").trim();

      if (value && onAdd(value)) {
        setValueState("");
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
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
      onBlur={handleBlur}
      onFocus={handleFocus}
      onPaste={handlePaste}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      className={tx("min-w-20 flex-1 outline-none", className)}
      value={valueState}
      onChange={handleChange}
      {...rest}
    />
  );
};
