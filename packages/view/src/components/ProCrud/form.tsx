/*
 * @Author: zdd
 * @Date: 2025-01-22 15:09:08
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2025-01-22 15:13:17
 * @FilePath: form.tsx
 */
import { ProFormColumnsType, BetaSchemaForm } from "@ant-design/pro-components";
import { ProCrudFormProps } from "./type.d";

export default function ProCrudForm<T, ValueType = "text">(
  props: ProCrudFormProps<T>
) {
  return (
    <BetaSchemaForm<T, ValueType>
      {...props}
      title={props.title as string | undefined}
      columns={props.columns as ProFormColumnsType<T, ValueType>[]}
      layoutType={props.layoutType as any}
    />
  );
}
