import type { JSX } from "react/jsx-runtime";
import type { EmptyObject, PrimitiveProps } from "../index";
import { usePopperAria } from "./popper-aria-context";

export const PopperDescription = (props: PrimitiveProps<"div", EmptyObject, "id">): JSX.Element => {
  const { descriptionId } = usePopperAria();

  return <div id={descriptionId} {...props} />;
};
