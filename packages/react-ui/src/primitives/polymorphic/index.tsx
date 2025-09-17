import { callAll } from "@resolid/utils";
import type { JSX, ReactNode } from "react";
import { tx } from "../../utils";
import { css } from "../../utils/css";

export type AnyObject = Record<string, unknown>;
export type EmptyObject = Record<never, never>;
export type Dict<V> = Record<string, V>;

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string | symbol]: any;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TupleTypes<T extends any[]> = T[number];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

export const mergeProps = <T extends Props>(
  ...args: Array<T | null | undefined>
): UnionToIntersection<TupleTypes<T[]>> => {
  const result: Props = { ...args[0] };

  for (let i = 1; i < args.length; i++) {
    const props = args[i];

    for (const key in props) {
      const a = result[key];
      const b = props[key];

      if (
        typeof a === "function" &&
        typeof b === "function" &&
        key[0] === "o" &&
        key[1] === "n" &&
        key.charCodeAt(2) >= /* 'A' */ 65 &&
        key.charCodeAt(2) <= /* 'Z' */ 90
      ) {
        result[key] = callAll(a, b);
        continue;
      }

      if (key === "className") {
        result[key] = tx(a, b);
        continue;
      }

      if (key === "style") {
        result[key] = css(a, b);
        continue;
      }

      result[key] = b !== undefined ? b : a;
    }
  }

  return result as UnionToIntersection<TupleTypes<T[]>>;
};

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
