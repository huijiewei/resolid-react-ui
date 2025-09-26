import { useEffect, useState } from "react";

export type UseClipboardOptions = {
  duration?: number;
  onError?: (error: Error) => void;
};

export const useClipboard = (options?: UseClipboardOptions): readonly [boolean, (source: string) => Promise<void>] => {
  const { duration = 2000, onError } = options ?? {};

  const [copied, setCopied] = useState(false);

  // eslint-disable-next-line react-you-might-not-need-an-effect/no-reset-all-state-on-prop-change
  useEffect(() => {
    const id = copied ? setTimeout(() => setCopied(false), duration) : null;

    return () => {
      if (id) {
        clearTimeout(id);
      }
    };
  }, [duration, copied]);

  const copy = async (source: string) => {
    try {
      await navigator.clipboard.writeText(source);
    } catch (e) {
      onError?.(e as Error);
    }

    setCopied(true);
  };

  return [copied, copy] as const;
};
