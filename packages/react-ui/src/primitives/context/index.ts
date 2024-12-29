import { createContext, use } from "react";

type SafeContextOptions<S> = {
  name: string;
  strict?: S;
  errorMessage?: string;
};

export const createSafeContext = <T, S extends boolean = true>(options: SafeContextOptions<S>) => {
  const { name, strict = true, errorMessage } = options;

  const SafeContext = createContext<T | undefined>(undefined);

  const useSafeContext = () => {
    const context = use(SafeContext);

    if (strict && context === undefined) {
      const error = new Error(
        errorMessage ??
          `use${name.replace("Context", "")} returned \`undefined\`. Seems you forgot to wrap component within ${name}`,
      );
      error.name = "ContextError";
      Error.captureStackTrace?.(error, useSafeContext);
      throw error;
    }

    return context as S extends true ? T : T | undefined;
  };

  return [SafeContext, useSafeContext] as const;
};
