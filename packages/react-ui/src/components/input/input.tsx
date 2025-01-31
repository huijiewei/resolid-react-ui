import { type ChangeEvent, type CSSProperties, type HTMLInputTypeAttribute, type ReactNode, useRef } from "react";
import { useControllableState, useMergeRefs } from "../../hooks";
import type { PrimitiveProps } from "../../primitives";
import { inputTextShareStyles } from "../../shared/styles";
import { tx } from "../../utils";
import { InputAffix } from "./input-affix";
import { type InputGroupContextValue, useInputGroup } from "./input-group-context";
import { inputAffixDefaultSizes, inputGroupStyles, inputSizeStyles } from "./input.styles";

export type InputProps = Partial<InputGroupContextValue> & {
  /**
   * 可控值
   */
  value?: string | number;

  /**
   * 默认值
   */
  defaultValue?: string | number;

  /**
   * onChange 回调
   */
  onChange?: (value: string | number) => void;

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;

  /**
   * 是否必须
   * @default false
   */
  required?: boolean;

  /**
   * 是否无效
   * @default false
   */
  invalid?: boolean;

  /**
   * 是否只读
   * @default false
   */
  readOnly?: boolean;

  /**
   * 是否全宽度
   * @default false
   */
  fullWidth?: boolean;

  /**
   * 占位符文本
   */
  placeholder?: string;

  /**
   * 前置元素
   */
  prefix?: ReactNode;

  /**
   * 前置元素宽度
   */
  prefixWidth?: number;

  /**
   * 后置元素
   */
  suffix?: ReactNode;

  /**
   * 后置元素宽度
   */
  suffixWidth?: number;

  /**
   * 输入框类型
   * @ignore
   * @default "text"
   */
  type?: Omit<
    HTMLInputTypeAttribute,
    | "button"
    | "submit"
    | "reset"
    | "checkbox"
    | "radio"
    | "range"
    | "color"
    | "date"
    | "datetime-local"
    | "month"
    | "time"
    | "week"
    | "hidden"
    | "file"
    | "image"
  >;
};

export const Input = (props: PrimitiveProps<"input", InputProps, "children">) => {
  const group = useInputGroup();

  const {
    size = group?.size ?? "md",
    invalid = false,
    disabled = false,
    required = false,
    readOnly = false,
    fullWidth = false,
    className,
    value,
    defaultValue = "",
    onChange,
    placeholder,
    prefix,
    prefixWidth,
    suffix,
    suffixWidth,
    type,
    inputMode,
    ref,
    ...rest
  } = props;

  const [valueState, setValueState] = useControllableState({ value, defaultValue, onChange });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (inputMode == "decimal" && (event.nativeEvent as InputEvent).isComposing) {
      return;
    }

    if (readOnly || disabled) {
      event.preventDefault();
      return;
    }

    setValueState(event.target.value);
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const refs = useMergeRefs(inputRef, ref);

  const affixSize = inputAffixDefaultSizes[size];

  return (
    <div
      className={tx(
        "relative inline-flex items-center rounded-md border outline-transparent transition-colors",
        "focus-within:border-bg-primary-emphasis focus-within:outline-bg-primary-emphasis/70 focus-within:outline-1",
        fullWidth && "w-full",
        invalid ? "border-bd-invalid" : "border-bd-normal",
        group && inputGroupStyles,
        group && "focus-within:z-1",
        !disabled && !invalid && "not-focus-within:hover:border-bd-hovered",
        className,
      )}
      style={
        {
          "--pw": prefix ? (prefixWidth ? `${prefixWidth}px` : affixSize) : undefined,
          "--sw": suffix ? (suffixWidth ? `${suffixWidth}px` : affixSize) : undefined,
        } as CSSProperties
      }
    >
      {prefix && <InputAffix className={"w-(--pw) start-0"}>{prefix}</InputAffix>}
      <input
        ref={refs}
        className={tx(
          "w-full resize-none appearance-none text-left align-middle outline-none",
          "bg-bg-normal rounded-md transition-colors",
          "disabled:bg-bg-subtlest disabled:cursor-not-allowed disabled:opacity-60",
          inputSizeStyles[size],
          inputTextShareStyles[size],
          prefix && "ps-(--pw)",
          suffix && "pe-(--sw)",
        )}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        type={type as HTMLInputTypeAttribute}
        inputMode={inputMode}
        value={valueState}
        onChange={handleChange}
        {...rest}
      />
      {suffix && <InputAffix className={"w-(--sw) end-0"}>{suffix}</InputAffix>}
    </div>
  );
};
