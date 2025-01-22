/*
 * @Author: zdd
 * @Date: 2025-01-22 15:08:39
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2025-01-22 15:28:08
 * @FilePath: index.tsx
 */
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { useProTableSizeObserver } from "tools";
import React, { useRef } from "react";
import type { ProCrudProps, RecordType } from "./type";
import ProCrudDetail from "./detail";
import ProCrudForm from "./form";
export * from "./type.d";

export { ProCrudDetail, ProCrudForm };

export default <
  T extends RecordType,
  Params extends RecordType = RecordType,
  ValueType = "text",
>(
  props: ProCrudProps<T, Params, ValueType>
) => {
  const _actionRef = useRef<ActionType>();
  const actionRef = (props.actionRef ??
    _actionRef) as React.RefObject<ActionType>;
  const { tableScrollY } = useProTableSizeObserver(actionRef, { bottom: 16 });
  return (
    <ProTable<T, Params, ValueType>
      actionRef={actionRef}
      scroll={{ x: "max-content", y: tableScrollY }}
      type="table"
      {...props}
      columns={props.columns as ProColumns<T, ValueType>[]}
    />
  );
};
