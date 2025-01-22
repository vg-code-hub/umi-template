/*
 * @Author: zdd
 * @Date: 2025-01-22 15:10:22
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2025-01-22 15:10:39
 * @FilePath: type.d.ts
 */
/** @name 列配置能力 */
export type ProCrudColumns<T, ValueType = "text"> = Partial<
  | ProColumns<T, ValueType>
  | ProFormColumnsType<T, ValueType>
  | ProDescriptionsItemProps<T, ValueType>
>;

/** ProCrud 的类型定义 继承自 ProTableProps */
export type ProCrudProps<T, U, ValueType = "text"> = Partial<
  Omit<ProTableProps<T, U, ValueType>, "columns"> & {
    columns: ProCrudColumns<T, ValueType>[];
    formConfig: ProCrudFormProps<T, ValueType>;
  }
>;

export type RecordType = Record<string, any>;

export type ProCrudDetailProps<
  T extends RecordType,
  ValueType = "text",
> = Partial<
  ProDescriptionsProps<T, ValueType> & {
    /** @name 弹框的标题 */
    title?: React.ReactNode;
    /** @name 用于触发抽屉打开的 dom */
    trigger?: JSX.Element;
    /** @name 弹框的宽度 */
    width?: string | number;
    columns: ProCrudColumns<T>[];
    layoutType: "ModalForm" | "DrawerForm";
  }
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
