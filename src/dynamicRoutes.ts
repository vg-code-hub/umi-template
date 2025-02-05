/*
 * @Author: zdd
 * @Date: 2025-02-05 14:10:48
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2025-02-05 14:46:49
 * @FilePath: dynamicRoutes.ts
 */
import access from "@/access";
import type { DynamicRoutes } from "./dynamicRoutes.d";
import { lazy } from "react";
import { Outlet } from "umi";
import { find } from "lodash-es";

export function rebuildRedirect(
  routes: DynamicRoutes.ParsedRoutes,
  baseRouteIdx = 2
) {
  const accessControl: Record<string, boolean> = access();
  // 删除没有访问权限的路由
  Object.keys(routes).forEach((key: any) => {
    let r = routes[key] as any;
    if (r.access && !accessControl[r.access]) {
      delete routes[key];
    }
  });
  const firstRouteKey = Object.keys(routes)[baseRouteIdx];
  const firstDynamicRoute = routes[firstRouteKey];

  const nonRedirectRoutes: any[] = [];
  const redirectRoutes: any[] = [],
    routesToDelete: any[] = [];

  // 分类路由
  Object.keys(routes).forEach((key: any) => {
    const k = Number(key);
    let r = routes[key] as any;
    if (k && !r.redirect && r.parentId) {
      nonRedirectRoutes.push(r);
    } else if (k && r.redirect && r.parentId) {
      redirectRoutes.push(r);
    }
  });

  // 处理重定向路由
  redirectRoutes.forEach((route: any) => {
    const parentRoute = find(
      nonRedirectRoutes,
      (r: any) => r.parentId === route.parentId
    );
    if (!parentRoute) {
      routesToDelete.push(route.id);
      delete route["parentId"];
    } else {
      route.redirect = parentRoute.path;
    }
  });

  // 删除无效路由
  routesToDelete.forEach((id: any) => {
    delete routes[id];
  });

  // 更新根路径的重定向
  Object.keys(routes).forEach((key: any) => {
    let r = routes[key] as any;
    if (r.path === "/" && r.redirect) {
      r.redirect = firstDynamicRoute.path;
    }
  });
}
