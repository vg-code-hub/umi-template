/*
 * @Author: zdd
 * @Date: 2025-01-06 13:59:01
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2025-02-27 11:27:37
 * @FilePath: .umirc.ts
 */
import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    {
      path: "login",
      layout: false,
      component: "./login",
    },
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      component: "index",
      name: "首页",
      icon: "https://frontend-projects-assets.oss-cn-hangzhou.aliyuncs.com/static/schedule/layout_schedule.png",
      access: "home",
    },
    {
      path: "/docs",
      component: "docs",
      name: "文档",
      icon: "https://frontend-projects-assets.oss-cn-hangzhou.aliyuncs.com/static/schedule/layout_transport.png",
    },
    {
      path: "/table",
      name: "表格",
      icon: "https://frontend-projects-assets.oss-cn-hangzhou.aliyuncs.com/static/schedule/layout_emergency.png",
      routes: [
        {
          path: "query_table",
          component: "table/query_table",
          name: "查询表格",
          access: "query_table",
        },
        {
          path: "no_query_table",
          component: "table/no_query_table",
          name: "无查询表单",
        },
        {
          path: "nested_table",
          component: "table/nested_table",
          name: "嵌套表格",
          access: "nested_table",
        },
        {
          path: "crud_table",
          component: "table/crud_table",
          name: "CRUD 表格",
        },
        {
          path: "",
          redirect: "query_table",
        },
      ],
    },
    { path: "*", component: "404" },
  ],
  plugins: [
    "@umijs/plugins/dist/antd",
    "@umijs/plugins/dist/initial-state",
    "@umijs/plugins/dist/access",
    "@umijs/plugins/dist/model",
    "@umijs/plugins/dist/request",
    "@umijs/plugins/dist/layout",
    "@umijs/plugins/dist/locale",
    "@umijs/plugins/dist/styled-components",
    "@umijs/plugins/dist/tailwindcss",
    "@umijs/plugins/dist/valtio",
    "umi-plugin-circular-check",
    require.resolve("@alita/plugins/dist/keepalive"),
  ],
  npmClient: "pnpm",
  mako: {},
  tailwindcss: {},
  antd: {},
  layout: {
    title: "umi-template",
  },
  valtio: {},
  request: {},
  initialState: {},
  model: {},
  access: {},
  keepalive: [],
  styledComponents: { babelPlugin: {} },
});
