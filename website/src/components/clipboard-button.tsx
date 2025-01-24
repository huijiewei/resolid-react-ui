import { Button, Tooltip, TooltipArrow, TooltipContent, TooltipTrigger, useClipboard } from "@resolid/react-ui";
import { SpriteIcon } from "~/components/sprite-icon";

export const ClipboardButton = ({ content }: { content: string }) => {
  const [copied, setCopied] = useClipboard(content);

  return (
    <Tooltip color={copied ? "success" : undefined}>
      <TooltipTrigger as={Button} iconOnly size={"xs"} color={"neutral"} variant={"soft"} onClick={() => setCopied()}>
        {copied ? (
          <SpriteIcon size={"sm"} className={"text-fg-success"} name={"clipboard-check"} />
        ) : (
          <SpriteIcon size={"sm"} className={"text-fg-muted hover:text-link-hovered"} name={"clipboard"} />
        )}
      </TooltipTrigger>
      <TooltipContent>
        <TooltipArrow />
        {copied ? "复制成功" : "复制代码"}
      </TooltipContent>
    </Tooltip>
  );
};
