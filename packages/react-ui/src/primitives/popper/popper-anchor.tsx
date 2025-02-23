import { useMergeRefs } from "../../hooks";
import { Polymorphic, type PolymorphicProps } from "../polymorphic";
import { usePopperAnchor } from "./popper-anchor-context";

export const PopperAnchor = (props: PolymorphicProps<"div">) => {
  const { render, ref, ...rest } = props;

  const { setPositionReference } = usePopperAnchor();

  const refs = useMergeRefs(ref, setPositionReference);

  return <Polymorphic as={"div"} render={render} ref={refs} {...rest} />;
};
