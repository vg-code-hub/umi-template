/*
 * @Author: zdd
 * @Date: 2024-07-09 16:18:03
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2025-01-08 15:11:53
 * @FilePath: dynamicRoutes.d.ts
 */
// @/utils/dynamicRoutes/typing.d.ts

import type { LazyExoticComponent, ComponentType } from "react";
import { Outlet } from "umi";

declare namespace DynamicRoutes {
  // 后端返回的路由数据为 RouteRaw[]
  interface RouteRaw {
    menuId: string;
    parentId: string;
    enable: boolean;
    name: string;
    sort: number;
    path: string;
    direct: boolean;
    createdAt: string;
  }

  // 前端根据后端返回数据生成的路由数据
  interface Route {
    id: string;
    parentId: "ant-design-pro-layout" | string;
    name: string;
    path: string;
    file?: string;
    children?: Route[];
  }

  // 前端根据后端返回数据生成的React.lazy懒加载组件或Outlet（一级路由）
  type RouteComponent = LazyExoticComponent<ComponentType<any>> | typeof Outlet;

  // patchRoutes 函数的参数可以解构出 { routes, routeComponents }
  // 此类型用于 Object.assign(routes, parsedRoutes)，合并路由数据
  interface ParsedRoutes {
    [key: number | string]: Route;
  }

  // 此类型用于 Object.assign(routeComponents, parsedRoutes)，合并路由组件
  interface ParsedRouteComponent {
    [key: number | string]: RouteComponent;
  }

  // parseRoutes 函数的返回值
  interface ParseRoutesReturnType {
    routes: DynamicRoutes.ParsedRoutes;
    routeComponents: DynamicRoutes.ParsedRouteComponent;
  }
}
