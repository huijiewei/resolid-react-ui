import { Tabs, TabsIndicator, TabsList, TabsPanel, TabsTab } from "@resolid/react-ui";
import { Children, isValidElement, type ReactElement, useMemo } from "react";
import { PackageIcon } from "~/components/package-icon";

export const MdxCodeGroup = ({
  children,
}: {
  children: Array<ReactElement<{ children: ReactElement<{ codeGroup: string }> }>>;
}) => {
  const tabs = useMemo(() => {
    return Children.map(children, (child) => {
      if (
        !isValidElement(child) ||
        !child.props ||
        !child.props.children ||
        !child.props.children.props ||
        !child.props.children.props.codeGroup
      ) {
        return false;
      }

      return {
        name: child.props.children.props.codeGroup,
        node: child,
      };
    })?.filter(Boolean);
  }, [children]);

  if (!tabs || tabs.length == 0) {
    return children;
  }

  return (
    <Tabs defaultValue={"pnpm"} className={"border-bd-normal w-auto rounded-md border"}>
      <TabsList className={"border-bd-normal gap-1 border-b p-2"}>
        <TabsIndicator className={"bg-bg-subtle -z-1 w-(--wv) h-(--hv) rounded-md"} />
        {tabs.map((tab) => {
          return (
            <TabsTab key={tab.name} value={tab.name} className={"inline-flex gap-2 rounded-md px-3"}>
              <PackageIcon size={"1em"} name={tab.name} />
              {tab.name}
            </TabsTab>
          );
        })}
      </TabsList>
      {tabs.map((tab) => {
        return (
          <TabsPanel tabIndex={-1} key={tab.name} value={tab.name}>
            {tab.node}
          </TabsPanel>
        );
      })}
    </Tabs>
  );
};
