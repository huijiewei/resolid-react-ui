import { useIsomorphicEffect } from "../../hooks";
import type { PrimitiveProps } from "../../primitives";
import { SearchIcon } from "../../shared/icons";
import { tx } from "../../utils";
import { Input, type InputProps } from "../input/input";
import { useListboxFilter } from "./listbox-filter-context";
import { useListboxState } from "./listbox-state-context";

export type ListboxFilterProps = Omit<InputProps, "type">;

export const ListboxFilter = (props: PrimitiveProps<"input", ListboxFilterProps, "children" | "type">) => {
  const { size: listboxSize, disabled: listboxDisabled } = useListboxState();

  const { getNavigationProps, filterRef, setFilterKeyword } = useListboxFilter();

  const {
    size = listboxSize,
    disabled = listboxDisabled,
    prefix,
    suffix = <SearchIcon />,
    value,
    defaultValue,
    onChange,
    className,
    ...rest
  } = props;

  useIsomorphicEffect(() => {
    filterRef.current = true;
  }, [filterRef]);

  const handleChange = (value: string | number) => {
    onChange?.(value);

    setFilterKeyword(value.toString());
  };

  return (
    <div className={tx("p-1", className)}>
      <Input
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        prefix={prefix}
        suffix={suffix}
        disabled={disabled}
        size={size}
        type={"text"}
        autoComplete={"off"}
        autoCapitalize={"none"}
        autoCorrect={"off"}
        spellCheck={false}
        aria-autocomplete={"list"}
        className={"w-full"}
        {...getNavigationProps(rest)}
      />
    </div>
  );
};
