import type { ElementType, MouseEvent } from "react";
import type { PolymorphicProps } from "../../primitives";
import { usePopperDispatch } from "./popper-dispatch-context";

export const PopperClose = <T extends ElementType = "button">(props: PolymorphicProps<T>) => {
  const { as: Component = "button", children, onClick, ...rest } = props;

  const { handleClose } = usePopperDispatch();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);

    handleClose();
  };

  return (
    <Component type="button" onClick={handleClick} {...rest}>
      {children}
    </Component>
  );
};
