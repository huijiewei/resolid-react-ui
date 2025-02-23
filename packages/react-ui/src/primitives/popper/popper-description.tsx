import type { EmptyObject, PrimitiveProps } from "../index";
import { usePopperAria } from "./popper-aria-context";

export const PopperDescription = (props: PrimitiveProps<"div", EmptyObject, "id">) => {
  const { children, ...rest } = props;

  const { descriptionId } = usePopperAria();

  return (
    <div id={descriptionId} {...rest}>
      {children}
    </div>
  );
};
