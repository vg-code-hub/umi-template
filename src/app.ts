/*
 * @Author: zdd
 * @Date: 2025-01-06 14:10:34
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2025-01-06 16:49:38
 * @FilePath: app.ts
 */
import React, { useState } from "react";
import { message } from "antd";
import { RequestConfig, RunTimeLayoutConfig } from "umi";
import Avator from "./layouts/avatar";
import LayoutCollapsed from "./layouts/collapsed";
import "./auto_update";

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [collapsed, setCollapsed] = useState<boolean>(false);
  return {
    disableContentMargin: false,
    rightContentRender: () => React.createElement(Avator),
    layout: "mix",
    headerTheme: "dark",
    primaryColor: "#2F54EB",
    token: {
      sider: {},
      header: {},
      colorPrimary: "#2353A6",
    },
    contentStyle: { backgroundColor: "#f5f5f5 " },
    collapsed: collapsed,
    collapsedButtonRender: () =>
      React.createElement(LayoutCollapsed, { collapsed, setCollapsed }),
    onPageChange: () => {},
    ...initialState,
  };
};

message.config({
  top: 80,
  duration: 1,
  maxCount: 1,
});

export const request: RequestConfig = {
  timeout: 30000,
};
