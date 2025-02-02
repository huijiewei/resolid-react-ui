import {
  Button,
  type ColorMode,
  DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  useColorModeDispatch,
  useColorModeState,
} from "@resolid/react-ui";
import { SpriteIcon } from "~/components/sprite-icon";

const colorModes = {
  light: {
    label: "亮色模式",
    icon: "sun",
  },
  dark: {
    label: "暗色模式",
    icon: "moon",
  },
  system: {
    label: "跟随系统",
    icon: "auto",
  },
};

export const ColorModeToggle = () => {
  const colorMode = useColorModeState();
  const setColorMode = useColorModeDispatch();

  return (
    <DropdownMenu placement={"bottom"}>
      <DropdownMenuTrigger
        as={Button}
        active={true}
        aria-label={"颜色模式"}
        color={"neutral"}
        iconOnly
        variant={"ghost"}
        size={"sm"}
      >
        <SpriteIcon name={colorModes[colorMode].icon} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"text-sm"}>
        <DropdownMenuArrow />
        {Object.entries(colorModes).map(([key, mode]) => {
          return (
            <DropdownMenuItem
              key={key}
              label={key}
              className={colorMode == key ? "text-link" : ""}
              onSelect={() => {
                setColorMode(key as ColorMode);
              }}
            >
              <SpriteIcon size={"xs"} name={mode.icon} className={"me-1.5"} />
              <span>{mode.label}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
