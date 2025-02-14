import type { MouseEvent } from "react";
import { type EmptyObject, type HtmlProps, Polymorphic, type PolymorphicProps } from "../../primitives";
import { usePopperDispatch } from "./popper-dispatch-context";

type PopperCloseHtmlProps = HtmlProps<"button">;

export const PopperClose = (props: PolymorphicProps<PopperCloseHtmlProps, EmptyObject, "type">) => {
  const { render, children, onClick, ...rest } = props;

  const { handleClose } = usePopperDispatch();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);

    handleClose();
  };

  return (
    <Polymorphic<PopperCloseHtmlProps> as={"button"} render={render} type="button" onClick={handleClick} {...rest}>
      {children}
    </Polymorphic>
  );
};
