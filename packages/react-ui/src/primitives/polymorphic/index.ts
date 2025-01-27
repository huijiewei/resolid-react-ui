import type { ComponentProps, ElementType, JSX } from "react";

export type PrimitiveProps<
  T extends keyof JSX.IntrinsicElements,
  P extends Record<string, unknown> = Record<never, never>,
  O extends string | number | symbol = never,
> = Omit<JSX.IntrinsicElements[T], keyof P | O> & P;

type AsProps<T extends ElementType> = { as?: T; tagName?: keyof JSX.IntrinsicElements };

export type PolymorphicProps<
  T extends ElementType,
  P extends Record<string, unknown> = Record<never, never>,
  O extends string | number | symbol = never,
> = Omit<ComponentProps<T>, keyof AsProps<T> | keyof P | O> & P & AsProps<T>;
