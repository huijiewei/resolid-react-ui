import { useEffect, useState } from "react";

export type UseClipboardOptions = {
  duration?: number;
  onError?: (error: Error) => void;
};

export const useClipboard = (text: string, options?: UseClipboardOptions) => {
  const duration = options?.duration ?? 2000;

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const id = copied ? setTimeout(() => setCopied(false), duration) : null;

    return () => {
      if (id) {
        clearTimeout(id);
      }
    };
  }, [duration, copied]);

  return [
    copied,
    async () => {
      try {
        await navigator.clipboard.writeText(text);
      } catch (e) {
        options?.onError?.(e as Error);
      }

      setCopied(true);
    },
  ] as const;
};
