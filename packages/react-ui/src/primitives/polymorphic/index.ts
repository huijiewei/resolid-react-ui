import type { Assign, Simplify } from "@resolid/utils";
import type { ComponentProps, ElementType, JSX } from "react";

export type PrimitiveProps<
  T extends keyof JSX.IntrinsicElements,
  P extends Record<string, unknown> = Record<never, never>,
  O extends string | number | symbol = never,
> = Simplify<Omit<Assign<JSX.IntrinsicElements[T], P>, O>>;

export type PolymorphicProps<
  T extends ElementType,
  P extends Record<string, unknown> = Record<never, never>,
  O extends string | number | symbol = never,
> = Omit<Assign<ComponentProps<T>, P>, O> & {
  as?: T;
};
