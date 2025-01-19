import { useClipboard } from "@resolid/react-ui";
import { SpriteIcon } from "~/components/sprite-icon";

export const ClipboardButton = ({ content }: { content: string }) => {
  const [copied, setCopied] = useClipboard(content);

  return (
    <button title={"复制代码"} className={"p-0.5"} onClick={() => setCopied()}>
      {copied ? (
        <SpriteIcon size={"1rem"} className={"text-fg-success"} name={"clipboard-check"} />
      ) : (
        <SpriteIcon size={"1rem"} className={"text-fg-muted hover:text-link-hovered"} name={"clipboard"} />
      )}
    </button>
  );
};
