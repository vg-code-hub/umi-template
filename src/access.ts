/*
 * @Author: guojinchan guojinchan@grizzlychina.com
 * @Date: 2024-01-17 16:42:30
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2025-02-05 14:28:55
 * @FilePath: access.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { InitialState } from "./app";
import { getRole } from "./models/user";

export default function (initialState?: InitialState) {
  const role = initialState?.role ?? getRole();
  return {
    home: role === "admin",
    query_table: role === "admin",
    nested_table: role === "admin",
  };
}
