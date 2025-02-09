import type { PrimitiveProps } from "../../primitives";
import { usePopperAria } from "./popper-aria-context";

export const PopperDescrition = (props: PrimitiveProps<"div", Record<never, never>, "id">) => {
  const { children, ...rest } = props;

  const { descriptionId } = usePopperAria();

  return (
    <div id={descriptionId} {...rest}>
      {children}
    </div>
  );
};
