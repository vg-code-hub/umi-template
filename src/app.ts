/*
 * @Author: zdd
 * @Date: 2025-01-06 14:10:34
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2025-02-27 13:12:48
 * @FilePath: app.ts
 */
import { message } from "antd";
import React, { useState } from "react";
import { history, RunTimeLayoutConfig } from "umi";
import "./auto_update";
import { rebuildRedirect } from "./dynamicRoutes";
import type { DynamicRoutes } from "./dynamicRoutes.d";
import Avator from "./layouts/avatar";
import LayoutCollapsed from "./layouts/collapsed";
import { getRole } from "./models/user";

message.config({
  top: 80,
  duration: 1,
  maxCount: 1,
});

export type InitialState = {
  role?: string;
};

export const layout: RunTimeLayoutConfig = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [collapsed, setCollapsed] = useState<boolean>(false);
  return {
    rightContentRender: () => React.createElement(Avator),
    layout: "mix",
    token: {
      sider: {},
      header: {},
      colorPrimary: "#2353A6",
    },
    contentStyle: { backgroundColor: "#f5f5f5 " },
    collapsed: collapsed,
    collapsedButtonRender: () =>
      React.createElement(LayoutCollapsed, { collapsed, setCollapsed }),
    onPageChange: () => {
      const { location } = history;
      const role = getRole();
      // 如果没有登录，重定向到 login
      if (!role && location.pathname !== "/login") {
        history.push("/login");
      }
    },
  };
};

export async function getInitialState(): Promise<InitialState> {
  return {
    role: getRole(),
  };
}

export const request = {
  timeout: 30000,
};

export function patchRoutes({ routes }: DynamicRoutes.ParseRoutesReturnType) {
  rebuildRedirect(routes);

  console.log({ routes });
}
