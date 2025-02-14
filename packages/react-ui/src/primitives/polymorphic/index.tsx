import type { JSX, ReactNode } from "react";

export type AnyObject = Record<string, unknown>;
export type EmptyObject = Record<never, never>;
export type Dict<V> = Record<string, V>;

export type HtmlProps<
  T extends keyof JSX.IntrinsicElements,
  P extends AnyObject = EmptyObject,
  O extends keyof JSX.IntrinsicElements[T] = never,
> = Omit<JSX.IntrinsicElements[T], keyof P | O>;

export type PrimitiveProps<
  T extends keyof JSX.IntrinsicElements,
  P extends AnyObject = EmptyObject,
  O extends keyof JSX.IntrinsicElements[T] = never,
> = P & HtmlProps<T, P, O>;

type RenderProps = { render?: (props: AnyObject) => ReactNode };

export type PolymorphicProps<H, P extends AnyObject = EmptyObject, O extends keyof H = never> = RenderProps &
  P &
  Omit<H, O>;

export const Polymorphic = <P extends AnyObject>(props: RenderProps & { as: string } & P) => {
  const { render, as: Tag, ...rest } = props;

  if (render) {
    return render(rest);
  }

  return <Tag {...rest} />;
};
