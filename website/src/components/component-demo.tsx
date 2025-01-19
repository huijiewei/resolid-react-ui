import type { ComponentType, PropsWithChildren } from "react";
import { dynamicLoader } from "~/components/dynamic-loader";

export type ComponentDemoProps = {
  demoId?: string;
};

const demos = import.meta.glob<boolean, string, { default: ComponentType }>("../../.resolid/component-demo/*.tsx");

export const ComponentDemo = ({ demoId, children }: PropsWithChildren<ComponentDemoProps>) => {
  const Demo = dynamicLoader({
    loader: async () => ({ default: (await demos[`../../.resolid/component-demo/${demoId}.tsx`]())["default"] }),
    fallback: <>Loading...</>,
  });

  return (
    <div className={"demo group"}>
      <div className={"not-prose scrollbar scrollbar-thin border-bd-normal overflow-x-auto rounded-t-md border p-3"}>
        <Demo />
      </div>
      {children}
    </div>
  );
};
