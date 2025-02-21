import { CloseButton, tx } from "@resolid/react-ui";
import { useState } from "react";
import { Outlet } from "react-router";
import { AsideLayoutMenu, type Menu } from "~/components/aside-menu";
import { SpriteIcon } from "~/components/sprite-icon";
import { mergeMeta } from "~/utils/react-router-meta";

// noinspection JSUnusedGlobalSymbols
export const meta = mergeMeta(() => {
  return [
    {
      title: "文档",
    },
  ];
});

// noinspection JSUnusedGlobalSymbols
export default function Layout() {
  const [opened, setOpened] = useState(false);

  return (
    <div className={"xl:max-w-288 mx-auto flex"}>
      <div
        className={
          "z-15 bg-bg-normal border-b-bd-normal fixed flex h-9 w-full items-center justify-between border-b px-2 text-sm md:hidden"
        }
      >
        <button type={"button"} onClick={() => setOpened(true)} className={"inline-flex items-center gap-1"}>
          <SpriteIcon name={"menu"} />
          导航
        </button>
      </div>
      <aside
        className={tx(
          "z-15 bg-bg-normal md:z-none border-r-bg-normal fixed w-48 border-r md:block md:border-none",
          "scrollbar scrollbar-base overflow-y-auto",
          "max-h-[calc(100vh-var(--spacing)*16)] md:sticky md:top-16",
          opened ? "block" : "hidden",
        )}
      >
        <nav className={"pb-28 text-sm md:pb-0"}>
          <CloseButton onClick={() => setOpened(false)} className={"absolute end-2 top-2 md:hidden"} />
          <AsideLayoutMenu menus={menus} onClickMenu={() => setOpened(false)} />
        </nav>
      </aside>
      <main className={"flex w-full grow pt-9 md:max-w-[calc(100%-var(--spacing)*48)] md:pt-0"}>
        <Outlet />
      </main>
    </div>
  );
}

const menus: Menu[] = [
  {
    label: "概述",
    children: [
      {
        label: "介绍",
        path: "",
      },
      {
        label: "入门指南",
        path: "getting-started",
      },
      {
        label: "主题设置",
        path: "theming",
      },
      {
        label: "深色模式",
        path: "dark-mode",
      },
    ],
  },
  {
    label: "通用组件",
    children: [
      {
        label: "按钮",
        path: "components/button",
      },
      {
        label: "图标",
        path: "components/icon",
      },
      {
        label: "排版",
        path: "components/typography",
      },
      {
        label: "分割线",
        path: "components/separator",
      },
    ],
  },
  {
    label: "数据展示",
    children: [
      {
        label: "头像",
        path: "components/avatar",
      },
      {
        label: "徽标",
        path: "components/badge",
      },
      {
        label: "折叠面板",
        path: "components/collapsible",
      },
      {
        label: "选项卡",
        path: "components/tabs",
      },
      {
        label: "手风琴",
        path: "components/accordion",
      },
    ],
  },
  {
    label: "数据输入",
    children: [
      {
        label: "输入框",
        path: "components/input",
      },
      {
        label: "数字输入框",
        path: "components/number-input",
      },
      {
        label: "选择器",
        path: "components/select",
      },
      {
        label: "滑动输入条",
        path: "components/slider",
      },
      {
        label: "多选框",
        path: "components/checkbox",
      },
      {
        label: "单选框组",
        path: "components/radio-group",
      },
      {
        label: "开关",
        path: "components/switch",
      },
    ],
  },
  {
    label: "交互反馈",
    children: [
      {
        label: "警告提示",
        path: "components/alert",
      },
      {
        label: "通知提醒",
        path: "components/toast",
      },
      {
        label: "工具提示",
        path: "components/tooltip",
      },
      {
        label: "弹出框",
        path: "components/popover",
      },
      {
        label: "对话框",
        path: "components/dialog",
      },
      {
        label: "抽屉",
        path: "components/drawer",
      },
      {
        label: "进度条",
        path: "components/progress-bar",
      },
      {
        label: "加载器",
        path: "components/spinner",
      },
      {
        label: "覆盖层",
        path: "components/overlay",
      },
      {
        label: "加载覆盖层",
        path: "components/spinner-overlay",
      },
    ],
  },
  {
    label: "页面导航",
    children: [
      {
        label: "面包屑",
        path: "components/breadcrumb",
      },
      {
        label: "分页",
        path: "components/pagination",
      },
      {
        label: "下拉菜单",
        path: "components/dropdown-menu",
      },
      {
        label: "右键菜单",
        path: "components/context-menu",
      },
    ],
  },
];
