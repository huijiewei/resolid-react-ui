import type { ComponentProps, ElementType, JSX } from "react";

export type PrimitiveProps<
  T extends keyof JSX.IntrinsicElements,
  P extends Record<string, unknown> = Record<never, never>,
  O extends string | number | symbol = never,
> = Omit<Omit<JSX.IntrinsicElements[T], keyof P>, O> & P;

export type PolymorphicProps<
  T extends ElementType,
  P extends Record<string, unknown> = Record<never, never>,
  O extends string | number | symbol = never,
> = Omit<Omit<ComponentProps<T>, keyof P>, O> &
  P & {
    as?: T;
  };
