import type { ComponentProps, ElementType, JSX } from "react";

export type AnyObject = Record<string, unknown>;
export type EmptyObject = Record<never, never>;
export type Dict<V> = Record<string, V>;

export type PrimitiveProps<
  T extends keyof JSX.IntrinsicElements,
  P extends AnyObject = EmptyObject,
  O extends PropertyKey = never,
> = Omit<JSX.IntrinsicElements[T], keyof P | O> & P;

type AsProps<T extends ElementType> = { as?: T };

export type PolymorphicProps<
  T extends ElementType,
  P extends AnyObject = EmptyObject,
  O extends PropertyKey = never,
> = Omit<ComponentProps<T>, keyof (AsProps<T> & P) | O> & P & AsProps<T>;
