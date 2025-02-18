import { useButtonProps, useMergeRefs } from "../../hooks";
import { dataAttr } from "../../utils";
import { Polymorphic, type PolymorphicProps } from "../index";
import { usePopperReference } from "./popper-reference-context";

type PopperTriggerProps = { active?: boolean };

export const PopperTrigger = (props: PolymorphicProps<"button", PopperTriggerProps, "type">) => {
  const { render, active, disabled, tabIndex, children, ref, ...rest } = props;

  const { open, setReference, getReferenceProps } = usePopperReference();

  const refs = useMergeRefs(ref, setReference);

  const buttonProps = useButtonProps({
    hasRender: !!render,
    disabled,
    tabIndex,
  });

  return (
    <Polymorphic<"button">
      as={"button"}
      render={render}
      {...buttonProps}
      ref={refs}
      data-active={dataAttr(active && open)}
      {...getReferenceProps({
        ...rest,
      })}
    >
      {children}
    </Polymorphic>
  );
};
