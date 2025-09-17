import { isString } from "@resolid/utils";

const CSS_REGEX = /((?:--)?(?:\w+-?)+)\s*:\s*([^;]*)/g;

const serialize = (style: string): Record<string, string> => {
  const res: Record<string, string> = {};
  let match: RegExpExecArray | null;
  while ((match = CSS_REGEX.exec(style))) {
    res[match[1]!] = match[2]!;
  }
  return res;
};

export const css = (
  a: Record<string, string> | string | undefined,
  b: Record<string, string> | string | undefined,
): Record<string, string> | string => {
  if (isString(a)) {
    if (isString(b)) return `${a};${b}`;
    a = serialize(a);
  } else if (isString(b)) {
    b = serialize(b);
  }
  return Object.assign({}, a ?? {}, b ?? {});
};
