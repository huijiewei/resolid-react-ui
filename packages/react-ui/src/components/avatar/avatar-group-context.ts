import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type AvatarBaseProps = {
  /**
   * 头像大小
   * @default 64
   */
  size?: number | string;

  /**
   * 头像圆角
   * @default "full"
   */
  radius?: number | boolean | "full";
};

export type AvatarGroupContextValue = AvatarBaseProps;

const desc = createSafeContext<AvatarGroupContextValue>({
  name: "AvatarGroupContext",
});

export const AvatarGroupContext: SafeContext<AvatarBaseProps> = desc[0];
export const useAvatarGroup: UseSafeContext<AvatarBaseProps> = desc[1];
