import type { JSX } from "react/jsx-runtime";
import { useMergeRefs } from "../../hooks";
import { Polymorphic, type PolymorphicProps } from "../../primitives";
import { usePopperTrigger } from "../../primitives/popper/popper-trigger-context";
import { inputTextShareStyles } from "../../shared/styles";
import { tx } from "../../utils";
import { inputHeightStyles, inputSizeStyles } from "../input/input.styles";
import { useListboxState } from "../listbox/listbox-state-context";
import { useComboboxInput } from "./combobox-input-context";

const comboboxInputSizes = {
  xs: "mr-4",
  sm: "mr-4.5",
  md: "mr-5",
  lg: "mr-5.5",
  xl: "mr-6",
};

export const ComboboxInput = (props: PolymorphicProps<"input">): JSX.Element => {
  const { render, disabled = false, className, ref, ...rest } = props;

  const { size, disabled: ctxDisabled, readOnly } = useListboxState();

  const { getReferenceProps, setReference } = usePopperTrigger();
  const { inputRef, inputValue, name } = useComboboxInput();

  const refs = useMergeRefs(ref, inputRef, setReference);

  return (
    <Polymorphic
      as={"input"}
      render={render}
      ref={refs}
      value={inputValue}
      className={tx(
        !render && [
          "outline-none",
          comboboxInputSizes[size],
          inputSizeStyles[size],
          inputHeightStyles[size],
          inputTextShareStyles[size],
        ],
        className,
      )}
      name={name}
      disabled={disabled || ctxDisabled}
      readOnly={readOnly}
      autoComplete="off"
      autoCorrect="off"
      spellCheck="false"
      autoCapitalize="none"
      aria-autocomplete="list"
      {...getReferenceProps(rest)}
    />
  );
};
