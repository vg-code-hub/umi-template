/*
 * @Author: zdd
 * @Date: 2025-01-06 14:10:34
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2025-01-09 09:52:12
 * @FilePath: app.ts
 */
import React, { useEffect, useState } from "react";
import { message } from "antd";
import { defineApp, history, RunTimeLayoutConfig, useModel } from "umi";
import Avator from "./layouts/avatar";
import LayoutCollapsed from "./layouts/collapsed";
import type { DynamicRoutes } from "./dynamicRoutes.d";
import { parseRoutes, rebuildRedirect } from "./dynamicRoutes";
import "./auto_update";
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

export function patchRoutes({
  routes,
  routeComponents,
}: DynamicRoutes.ParseRoutesReturnType) {
  if (window.dynamicRoutes) {
    const currentRouteIndex = Object.keys(routes).length;
    const parsedRoutes = parseRoutes(window.dynamicRoutes, currentRouteIndex);
    Object.assign(routes, parsedRoutes.routes); // 参数传递的为引用类型，直接操作原对象，合并路由数据
    Object.assign(routeComponents, parsedRoutes.routeComponents); // 合并组件
  }

  rebuildRedirect(routes);
  console.log("patchRoutes", routes);
}
