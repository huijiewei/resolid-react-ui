import { Button } from "@resolid/react-ui";
import { HistoryLink } from "~/components/history-link";
import { SpriteIcon } from "~/components/sprite-icon";

// noinspection JSUnusedGlobalSymbols
export default function Index() {
  return (
    <div className={"prose dark:prose-invert mx-auto max-w-3xl px-4 py-8"}>
      <h1 className={"mt-16 text-center text-[3rem] font-[800] leading-normal md:text-[4rem]"}>Resolid React UI</h1>
      <p className={"text-center"}>
        Resolid React UI 是 React 的开源设计系统。使用 React 和 Tailwind CSS
        构建。它提供了一组即用型组件，用于构建具有一致外观的 Web 应用程序。
      </p>
      <p className={"bg-bg-warning rounded-md p-3 font-bold"}>🧑🏻‍💻 正在开发......</p>
      <div className={"not-prose mt-10 inline-flex w-full items-center justify-center gap-9"}>
        <Button as={HistoryLink} size={"xl"} to={"/docs/getting-started"}>
          快速开始
        </Button>
        <Button
          color={"neutral"}
          variant={"outline"}
          size={"xl"}
          as={"a"}
          href={"https://github.com/huijiewei/resolid-react-ui"}
          target={"_blank"}
          rel={"noreferrer"}
        >
          <SpriteIcon className={"me-2"} name={"github"} />
          Github
        </Button>
      </div>
    </div>
  );
}
