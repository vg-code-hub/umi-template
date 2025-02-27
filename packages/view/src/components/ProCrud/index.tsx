/*
 * @Author: zdd
 * @Date: 2025-01-22 15:08:39
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2025-01-23 14:24:50
 * @FilePath: index.tsx
 */
import type {
  ActionType,
  ProColumns,
  ProDescriptionsItemProps,
  ProFormColumnsType,
  ProFormInstanceType,
} from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import React, { useEffect, useRef, useState } from "react";
import { useProTableSizeObserver } from "tools";
import ProCrudDetail from "./detail";
import ProCrudForm from "./form";
import type { ProCrudProps, RecordType } from "./type";
export * from "./type.d";

export { ProCrudDetail, ProCrudForm };

const formProps = {
  width: "60%",

  layoutType: "ModalForm" as "ModalForm",
  modalProps: { destroyOnClose: true },
  rowProps: { gutter: [16, 16] },
  colProps: { span: 12 },
  grid: true,
  clearOnDestroy: true,
  title: "编辑",
  trigger: <></>,
};

const detailProps = {
  style: { background: "#fff" },
  layoutType: "ModalForm" as "ModalForm",
  modalProps: { destroyOnClose: true },
  // layoutType: "DrawerForm" as "ModalForm",
  // drawerProps: { destroyOnClose: true },
  title: "详情",
  width: "60%",
  column: 2,
  trigger: <a></a>,
};

export default <
  T extends RecordType,
  Params extends RecordType = RecordType,
  ValueType = "text",
>(
  props: ProCrudProps<T, Params, ValueType>,
) => {
  const _actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstanceType<T>>();
  const actionRef = (props.actionRef ??
    _actionRef) as React.RefObject<ActionType>;
  const { tableScrollY } = useProTableSizeObserver(actionRef, { bottom: 16 });
  const [formOpen, setFormOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [activeObj, setActiveObj] = useState<T>();

  useEffect(() => {
    if (props.crudRef) {
      props.crudRef.current = {
        setFormOpen: (row?: T) => {
          setActiveObj(row);
          setFormOpen(true);
        },
        setDetailOpen: (row: T) => {
          setActiveObj(row);
          setDetailOpen(true);
        },
      };
    }
  }, [props.crudRef]);

  return (
    <>
      <ProTable<T, Params, ValueType>
        actionRef={actionRef}
        scroll={{ x: "max-content", y: tableScrollY }}
        type="table"
        {...props}
        columns={props.columns as ProColumns<T, ValueType>[]}
      />
      <ProCrudForm
        {...formProps}
        {...props.formConfig}
        key={activeObj ? "编辑" : "新增"}
        title={activeObj ? "编辑" : "新增"}
        open={formOpen}
        formRef={formRef}
        onOpenChange={(visible: boolean) => {
          if (!visible) {
            setFormOpen(visible);
            setActiveObj(undefined);
          }
        }}
        initialValues={activeObj}
        columns={props.columns as ProFormColumnsType<T>[]}
      />
      <ProCrudDetail
        {...detailProps}
        {...props.detailConfig}
        open={detailOpen}
        onOpenChange={(visible: boolean) => {
          if (!visible) {
            setDetailOpen(visible);
            setActiveObj(undefined);
          }
        }}
        dataSource={activeObj}
        columns={props.columns as ProDescriptionsItemProps<T>[]}
      />
    </>
  );
};
