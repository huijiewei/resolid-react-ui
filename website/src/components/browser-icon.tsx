import { tx } from "@resolid/react-ui";
import browserIcons from "~/assets/icons/browser.svg";

type SpriteIconProps = {
  name: string;
  size?: string | number;
  className?: string;
};

export const BrowserIcon = (props: SpriteIconProps) => {
  const { name, size = "1em", className } = props;

  return (
    <svg style={{ width: size }} className={tx("aspect-square", className)}>
      <use href={`${browserIcons}#${name}`} />
    </svg>
  );
};
