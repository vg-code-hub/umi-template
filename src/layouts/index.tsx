/*
 * @Author: zdd
 * @Date: 2025-01-06 13:59:01
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2025-01-06 14:48:06
 * @FilePath: index.tsx
 */
import { theme, ConfigProvider, ThemeConfig } from "antd";
import { useKeepOutlets } from "umi";

export const customTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: "#2353A6",
    colorLink: "#2353A6",
    colorInfo: "#2353A6",
  },
  components: {
    Button: {
      borderRadius: 0,
    },
    Table: {
      borderRadius: 0,
      headerBg: "#F0F2F5",
      headerBorderRadius: 0,
      headerColor: "#1D2129",
    },
    Card: {
      borderRadius: 0,
    },
    Drawer: {},
    Input: {
      borderRadius: 0,
    },
    Select: {
      borderRadius: 0,
    },
    DatePicker: {
      borderRadius: 0,
    },
    Modal: {
      borderRadius: 0,
    },
    Tabs: {
      itemColor: "#999",
      itemActiveColor: "#000",
      itemSelectedColor: "#000",
      itemHoverColor: "#000",
    },
  },
};

export default function Layout() {
  const Outlet = useKeepOutlets();
  return <ConfigProvider theme={customTheme}>{Outlet}</ConfigProvider>;
}
