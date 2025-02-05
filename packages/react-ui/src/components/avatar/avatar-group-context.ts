import { createSafeContext } from "../../primitives";

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

export const [AvatarGroupContext, useAvatarGroup] = createSafeContext<AvatarGroupContextValue>({
  name: "AvatarGroupContext",
});
