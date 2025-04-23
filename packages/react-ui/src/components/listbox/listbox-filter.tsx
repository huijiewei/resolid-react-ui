import { useIsomorphicEffect } from "../../hooks";
import type { PrimitiveProps } from "../../primitives";
import { SearchIcon } from "../../shared/icons";
import { tx } from "../../utils";
import { Input, type InputProps } from "../input/input";
import { useListboxFilter } from "./listbox-filter-context";
import { useListboxState } from "./listbox-state-context";

export type ListboxFilterProps = Omit<
  InputProps,
  "type" | "name" | "required" | "readOnly" | "invalid" | "suffix" | "suffixWidth"
>;

export const ListboxFilter = (props: PrimitiveProps<"input", ListboxFilterProps, "children" | "type">) => {
  const { size: listboxSize, disabled: listboxDisabled } = useListboxState();

  const { getNavigationProps, filterRef, setFilterKeyword } = useListboxFilter();

  const {
    size = listboxSize,
    disabled = listboxDisabled,
    prefix,
    prefixWidth,
    value,
    defaultValue,
    onChange,
    className,
    ...rest
  } = props;

  useIsomorphicEffect(() => {
    // eslint-disable-next-line react-hooks/react-compiler
    filterRef.current = true;
  }, [filterRef]);

  const handleChange = (value: string | number) => {
    onChange?.(value);

    setFilterKeyword(value.toString());
  };

  return (
    <Input
      value={value}
      defaultValue={defaultValue}
      onChange={handleChange}
      prefix={prefix}
      prefixWidth={prefixWidth}
      suffix={<SearchIcon />}
      disabled={disabled}
      size={size}
      type={"text"}
      autoComplete={"off"}
      autoCapitalize={"none"}
      autoCorrect={"off"}
      spellCheck={false}
      aria-autocomplete={"list"}
      className={tx("w-full", className)}
      {...getNavigationProps(rest)}
    />
  );
};
