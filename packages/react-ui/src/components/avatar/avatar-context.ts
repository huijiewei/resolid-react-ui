import type { Dispatch, SetStateAction } from "react";
import type { ImageLoadStatus } from "../../hooks";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type AvatarContextValue = {
  name?: string;
  radiusClass?: string;
};

const avatarDesc = createSafeContext<AvatarContextValue>({
  name: "AvatarContext",
});
export const AvatarContext: SafeContext<AvatarContextValue> = avatarDesc[0];
export const useAvatar: UseSafeContext<AvatarContextValue> = avatarDesc[1];

export type AvatarStatusContextValue = {
  imageLoadStatus: ImageLoadStatus;
  setImageLoadStatus: Dispatch<SetStateAction<ImageLoadStatus>>;
};

const avatarStatusDesc = createSafeContext<AvatarStatusContextValue>({
  name: "AvatarStatusContext",
});
export const AvatarStatusContext: SafeContext<AvatarStatusContextValue> = avatarStatusDesc[0];
export const useAvatarStatus: UseSafeContext<AvatarStatusContextValue> = avatarStatusDesc[1];
