import type { Dispatch, SetStateAction } from "react";
import type { ImageLoadStatus } from "../../hooks";
import { createSafeContext } from "../../primitives";

export type AvatarContextValue = {
  name?: string;
  radiusClass?: string;
};

export const [AvatarContext, useAvatar] = createSafeContext<AvatarContextValue>({
  name: "AvatarContext",
});

export type AvatarStatusContextValue = {
  imageLoadStatus: ImageLoadStatus;
  setImageLoadStatus: Dispatch<SetStateAction<ImageLoadStatus>>;
};

export const [AvatarStatusContext, useAvatarStatus] = createSafeContext<AvatarStatusContextValue>({
  name: "AvatarStatusContext",
});
