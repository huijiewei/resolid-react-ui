import { Button, Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from "@resolid/react-ui";
import { SpriteIcon } from "~/components/sprite-icon";

export type StackblitzButtonProps = {
  name: string;
  code: string;
};

const commitRef = import.meta.env.VITE_VERCEL_GIT_COMMIT_REF ?? "f5fefad";

const createHiddenInput = (name: string, value: string) => {
  const input = document.createElement("input");
  input.type = "hidden";
  input.name = name;
  input.value = value;

  return input;
};

const openProject = async (name: string, code: string) => {
  const inputs: HTMLInputElement[] = [];

  const filename = name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();

  inputs.push(createHiddenInput("project[title]", `${name} - Resolid UI`));

  const { default: packageJsonSource } = await import("~/assets/sandbox/package.txt?raw");

  inputs.push(
    createHiddenInput(
      "project[files][package.json]",
      packageJsonSource.replaceAll("${filename}", filename).replaceAll("${commitRef}", commitRef),
    ),
  );

  const { default: tsconfigSource } = await import("~/assets/sandbox/tsconfig.txt?raw");

  inputs.push(createHiddenInput("project[files][tsconfig.json]", tsconfigSource));

  const { default: viteConfigSource } = await import("~/assets/sandbox/vite.config.txt?raw");

  inputs.push(createHiddenInput("project[files][vite.config.ts]", viteConfigSource));

  const { default: indexHtmlSource } = await import("~/assets/sandbox/index.html.txt?raw");

  inputs.push(createHiddenInput("project[files][index.html]", indexHtmlSource.replaceAll("${name}", name)));

  const { default: rootTsxSource } = await import("~/assets/sandbox/root.tsx.txt?raw");

  inputs.push(createHiddenInput("project[files][src/root.tsx]", rootTsxSource));

  inputs.push(createHiddenInput("project[files][src/app.tsx]", code));

  const { default: spriteSvgSource } = await import("~/assets/icons/sprite.svg?raw");

  inputs.push(createHiddenInput("project[files][src/assets/icons/sprite.svg]", spriteSvgSource));

  const { default: spriteIconSource } = await import("~/components/sprite-icon?raw");

  inputs.push(createHiddenInput("project[files][src/components/sprite-icon.tsx]", spriteIconSource));

  inputs.push(createHiddenInput("project[template]", "node"));

  const form = document.createElement("form");
  form.method = "POST";
  form.setAttribute("style", "display:none!important;");
  form.append(...inputs);
  form.action = "https://stackblitz.com/run?file=src%2Fapp.tsx";
  form.target = "_blank";

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};

export const StackblitzButton = ({ name, code }: StackblitzButtonProps) => {
  const handleClick = async () => {
    await openProject(name, code);
  };

  return (
    <Tooltip>
      <TooltipTrigger
        onClick={handleClick}
        render={(props) => <Button variant={"soft"} color={"neutral"} size={"xs"} iconOnly {...props} />}
      >
        <SpriteIcon size={15} className={"text-fg-primary"} name={"stackblitz"} />
      </TooltipTrigger>
      <TooltipContent>
        <TooltipArrow />在 Stackblitz 打开 {name} 组件
      </TooltipContent>
    </Tooltip>
  );
};
