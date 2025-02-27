/*
 * @Author: zdd
 * @Date: 2025-01-22 15:10:22
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2025-01-23 13:55:00
 * @FilePath: type.d.ts
 */
import type {
  DrawerFormProps,
  ModalFormProps,
  ProColumns,
  ProDescriptionsItemProps,
  ProDescriptionsProps,
  ProFormColumnsType,
  ProTableProps,
} from "@ant-design/pro-components";

/** @name 列配置能力 */
export type ProCrudColumns<T, ValueType = "text"> = Partial<
  | ProColumns<T, ValueType>
  | ProFormColumnsType<T, ValueType>
  | ProDescriptionsItemProps<T, ValueType>
>;

/** 操作类型 */
export type ProCrudRefType<T> = {
  /** @name 触发表单 */
  setFormOpen: (row?: T) => void;
  /** @name 查看详情 */
  setDetailOpen: (row: T) => void;
};

/** ProCrud 的类型定义 继承自 ProTableProps */
export type ProCrudProps<T, U, ValueType = "text"> = Partial<
  Omit<ProTableProps<T, U, ValueType>, "columns"> & {
    columns: ProCrudColumns<T, ValueType>[];
    formConfig: ProCrudFormProps<T, ValueType>;
    detailConfig: ProCrudDetailProps<T, ValueType>;
    /**
     * @name 初始化的参数，可以操作 table
     *
     * @example 重新刷新表格
     * actionRef.current?.reload();
     *
     * @example 重置表格
     * actionRef.current?.reset();
     */
    crudRef?: React.MutableRefObject<ProCrudRefType | undefined>;
  }
>;

export type RecordType = Record<string, any>;

export type ProCrudDetailProps<
  T extends RecordType,
  ValueType = "text",
> = Partial<
  ProDescriptionsProps<T, ValueType> &
    (
      | ({
          layoutType: "DrawerForm";
        } & DrawerFormProps<T>)
      | ({
          layoutType: "ModalForm";
        } & ModalFormProps<T>)
    )
>;

interface ProFormGridConfig {
  /**
   * open grid layout
   * @default false
   */
  grid?: boolean;
  /**
   * only works when grid is enabled
   *
   * When passing the `span` attribute, the default value is empty
   * @default
   * { xs: 24 }
   */
  colProps?: ColProps;
  /**
   * only works when grid is enabled
   * @default
   * { gutter: 8 }
   */
  rowProps?: RowProps;
}

export type ProCrudFormProps<T, ValueType = "text"> = Partial<
  (
    | ({
        layoutType: "DrawerForm";
      } & DrawerFormProps<T>)
    | ({
        layoutType: "ModalForm";
      } & ModalFormProps<T>)
  ) &
    ProFormGridConfig & {
      action?: React.MutableRefObject<ProCoreActionType | undefined>;
      columns: ProFormColumnsType<T, ValueType>[];
    }
>;
