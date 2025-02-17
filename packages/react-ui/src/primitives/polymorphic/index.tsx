import type { JSX, ReactNode } from "react";

export type AnyObject = Record<string, unknown>;
export type EmptyObject = Record<never, never>;
export type Dict<V> = Record<string, V>;

export type PrimitiveProps<
  T extends keyof JSX.IntrinsicElements,
  P extends AnyObject = EmptyObject,
  O extends keyof JSX.IntrinsicElements[T] = never,
> = P & Omit<JSX.IntrinsicElements[T], keyof P | O>;

type RenderProps = { render?: (props: AnyObject) => ReactNode };

export type PolymorphicProps<
  T extends keyof JSX.IntrinsicElements,
  P extends AnyObject = EmptyObject,
  O extends keyof JSX.IntrinsicElements[T] = never,
> = RenderProps & PrimitiveProps<T, P, O>;

export const Polymorphic = <T extends keyof JSX.IntrinsicElements>(
  props: RenderProps & { as: string } & JSX.IntrinsicElements[T],
) => {
  const { render, as: Tag, ...rest } = props;

  if (render) {
    return render(rest);
  }

  return <Tag {...rest} />;
};
