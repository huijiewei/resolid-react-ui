import { type ImgHTMLAttributes, useState } from "react";
import { useIsomorphicEffect } from "../use-isomorphic-effect";

type NativeImageProps = ImgHTMLAttributes<HTMLImageElement>;

export type UseImageLoadOptions = {
  src?: string;
  crossOrigin?: NativeImageProps["crossOrigin"];
  referrerPolicy?: NativeImageProps["referrerPolicy"];
};

export type ImageLoadStatus = "idle" | "loading" | "loaded" | "error";

export const useImageLoad = (options: UseImageLoadOptions) => {
  const { src, crossOrigin, referrerPolicy } = options;

  const [loadStatus, setLoadStatus] = useState<ImageLoadStatus>("idle");

  useIsomorphicEffect(() => {
    if (!src) {
      setLoadStatus("error");
      return () => {};
    }

    let isMounted = true;

    const image = new window.Image();

    const updateStatus = (status: ImageLoadStatus) => () => {
      if (!isMounted) {
        return;
      }

      setLoadStatus(status);
    };

    setLoadStatus("loading");

    image.onload = updateStatus("loaded");
    image.onerror = updateStatus("error");
    image.src = src;

    if (crossOrigin) {
      image.crossOrigin = crossOrigin;
    }

    if (referrerPolicy) {
      image.referrerPolicy = referrerPolicy;
    }

    return () => {
      isMounted = false;
    };
  }, [crossOrigin, referrerPolicy, src]);

  return loadStatus;
};
