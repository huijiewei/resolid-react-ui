import { useMergeRefs } from "../../hooks";
import { type HtmlProps, Polymorphic, type PolymorphicProps } from "../../primitives";
import { dataAttr } from "../../utils";
import { usePopperReference } from "./popper-reference-context";

type PopperTriggerProps = { active?: boolean };

type PopperTriggerHtmlProps = HtmlProps<"button", PopperTriggerProps>;

export const PopperTrigger = (props: PolymorphicProps<PopperTriggerHtmlProps, PopperTriggerProps, "type">) => {
  const { render, active, children, ref, ...rest } = props;

  const { open, setReference, getReferenceProps } = usePopperReference();

  const refs = useMergeRefs(ref, setReference);

  return (
    <Polymorphic<PopperTriggerHtmlProps>
      as={"button"}
      render={render}
      ref={refs}
      data-active={dataAttr(active && open)}
      type={render ? undefined : "button"}
      {...getReferenceProps({
        ...rest,
      })}
    >
      {children}
    </Polymorphic>
  );
};
