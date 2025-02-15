import { isUndefined } from "@resolid/utils";
import { createContext, use } from "react";

type SafeContextOptions = {
  name: string;
  errorMessage?: string;
};

export const createSafeContext = <T>(options: SafeContextOptions) => {
  const { name, errorMessage } = options;

  const SafeContext = createContext<T | undefined>(undefined);

  const useSafeContext = <O extends boolean = false>(optional: O = false as O) => {
    const context = use(SafeContext);

    if (!optional && isUndefined(context)) {
      throw new Error(
        errorMessage ??
          `use${name.replace("Context", "")} returned \`undefined\`. Seems you forgot to wrap component within ${name}`,
      );
    }

    return context as O extends true ? T | undefined : T;
  };

  return [SafeContext, useSafeContext] as const;
};
