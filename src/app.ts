/*
 * @Author: zdd
 * @Date: 2025-01-06 14:10:34
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2025-01-06 14:35:27
 * @FilePath: app.ts
 */
import React, { useState } from "react";
import { message } from "antd";
import {
  AxiosError,
  history,
  RequestConfig,
  RequestOptions,
  RunTimeLayoutConfig,
  UmiApiRequest,
  UmiApiResponse,
} from "umi";
import Avator from "./layouts/avatar";
import LayoutCollapsed from "./layouts/collapsed";
import "./auto_update_notify";

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
  top: 100,
  duration: 1,
  maxCount: 1,
});

export const request: RequestConfig = {
  timeout: 30000,
  requestInterceptors: [
    (config: RequestOptions) => {
      return config;
    },
  ],

  responseInterceptors: [
    (response) => {
      return response;
    },
    (error) => {
      // if (axios.isCancel(error)) {
      //   message.error(error.message);
      // }
      return Promise.reject(error);
    },
  ],
  errorConfig: {
    errorHandler: (error: AxiosError | Error, _opts: RequestOptions) => {
      // if ((error as AxiosError).code === "ERR_NETWORK") {
      //   message.error("网络错误，请检查网络连接");
      //   return;
      // } else if (
      //   (error as AxiosError).code === "ERR_BAD_REQUEST" &&
      //   error.message.includes("401")
      // ) {
      //   loginToast();
      //   Storage().removeToken();
      //   history.push("/login");
      //   return;
      // } else if ((error as AxiosError).code === "ECONNABORTED") {
      //   message.error("请求超时，请稍后重试");
      //   return;
      // }
    },
  },
};
