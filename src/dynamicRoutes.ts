/*
 * @Author: zdd
 * @Date: 2025-01-08 14:49:33
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2025-02-05 14:04:13
 * @FilePath: dynamicRoutes.ts
 */
import access from "@/access";
import type { DynamicRoutes } from "./dynamicRoutes.d";
import { lazy } from "react";
import { Outlet } from "umi";
import { find } from "lodash-es";

export function parseRoutes(
  routesRaw: DynamicRoutes.RouteRaw[],
  beginIdx: number
): DynamicRoutes.ParseRoutesReturnType {
  const routes: DynamicRoutes.ParsedRoutes = {}; // 转换后的路由信息
  const routeComponents: DynamicRoutes.ParsedRouteComponent = {}; // 生成的React.lazy组件
  const routeParentMap = new Map<string, number>(); // menuId 与路由记录在 routes 中的键 的映射。如：'role_management' -> 7

  let currentIdx = beginIdx; // 当前处理的路由项的键。把 patchRoutes 传进来的 routes 看作一个数组，这里就是元素的下标。

  routesRaw.forEach((route) => {
    let effectiveRoute = true; // 当前处理中的路由是否有效
    const routePath = route.path; // 全小写的路由路径
    const componentPath = route.component; // 组件路径 不含 @/pages/

    // 是否为直接显示（不含子路由）的路由记录，如：/home; /Dashboard
    if (!route.parentId) {
      // 生成路由信息
      const tempRoute: DynamicRoutes.Route = {
        id: currentIdx.toString(),
        parentId: "@@/global-layout",
        name: route.name,
        path: routePath,
        icon: route.icon,
      }; // 存储路由信息
      if (route.redirect) {
        tempRoute["redirect"] = route.redirect;
      }
      routes[currentIdx] = tempRoute; // 生成组件

      const tempComponent = route.component
        ? lazy(() => import(`@/pages/${componentPath}`))
        : Outlet; // 存储组件
      routeComponents[currentIdx] = tempComponent;
      routeParentMap.set(route.menuId, currentIdx);
    } else {
      // 非一级路由
      // 获取父级路由ID
      const realParentId = routeParentMap.get(route.parentId);

      if (realParentId) {
        // 生成路由信息
        const tempRoute: DynamicRoutes.Route = {
          id: currentIdx.toString(),
          parentId: realParentId.toString(),
          name: route.name,
          path: routePath,
        }; // 存储路由信息
        if (route.redirect) {
          tempRoute["redirect"] = route.redirect;
        }
        routes[currentIdx] = tempRoute; // 生成组件

        const tempComponent = componentPath
          ? lazy(() => import(`@/pages/${componentPath}`))
          : Outlet; // 存储组件
        routeComponents[currentIdx] = tempComponent;
      } else {
        // 找不到父级路由，路由无效，workingIdx不自增
        effectiveRoute = false;
      }
    }

    if (effectiveRoute) {
      // 当路由有效时，将workingIdx加一
      currentIdx += 1;
    }
  });

  return {
    routes,
    routeComponents,
  };
}

const baseRoutesCount = 4;

export function rebuildRedirect(routes: any) {
  const ac: any = access();
  Object.keys(routes).forEach((key: any) => {
    let r = routes[key] as any;
    if (r.access && !ac[r.access]) {
      delete routes[key];
    }
  });
  const key = Object.keys(routes)[baseRoutesCount];
  const first = routes[key];
  const rr: any[] = [];
  const rr2: any[] = [],
    deleteIds: any[] = [];
  Object.keys(routes).forEach((key: any) => {
    const k = Number(key);
    let r = routes[key] as any;
    if (k && !r.redirect && r.parentId) {
      rr.push(r);
    } else if (k && r.redirect && r.parentId) {
      rr2.push(r);
    }
  });

  rr2.forEach((r2: any) => {
    const f = find(rr, (r: any) => r.parentId === r2.parentId);
    if (!f) {
      deleteIds.push(r2.id);
      delete r2["parentId"];
    } else {
      r2.redirect = f.path;
    }
  });

  deleteIds.forEach((id: any) => {
    delete routes[id];
  });

  Object.keys(routes).forEach((key: any) => {
    let r = routes[key] as any;
    if (r.path === "/" && r.redirect) {
      r.redirect = first.path;
    }
  });
}
