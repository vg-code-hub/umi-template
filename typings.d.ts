/*
 * @Author: zdd
 * @Date: 2025-01-06 13:59:01
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2025-01-23 17:56:24
 * @FilePath: typings.d.ts
 */
import "umi/typings";
import type { DynamicRoutes } from "@/dynamicRoutes.d";

declare global {
  let BASENAME: string;

  interface Window {
    dynamicRoutes: DynamicRoutes.RouteRaw[];
  }
}
