/*
 * @Author: zdd
 * @Date: 2025-01-06 13:59:01
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2025-01-08 14:59:59
 * @FilePath: typings.d.ts
 */
import "umi/typings";

declare global {
  let BASENAME: string;

  interface Window {
    dynamicRoutes: DynamicRoutes.RouteRaw;
  }
}
