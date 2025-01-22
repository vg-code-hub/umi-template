/*
 * @Author: zdd
 * @Date: 2025-01-22 15:09:01
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2025-01-22 15:13:09
 * @FilePath: detail.tsx
 */
import {
  DrawerFormProps,
  DrawerForm,
  ProDescriptions,
  ModalForm,
} from "@ant-design/pro-components";
import { RecordType, ProCrudDetailProps } from "./type.d";

export default function ProCrudDetail<T extends RecordType, ValueType = "text">(
  props: ProCrudDetailProps<T, ValueType>
) {
  const formProps = {
    title: props.title,
    width: props.width,
    trigger: props.trigger,
    submitter: false,
  } as DrawerFormProps;
  if (props.layoutType === "DrawerForm") {
    return (
      <DrawerForm {...formProps}>
        <ProDescriptions<T, ValueType> {...props} title={null} />
      </DrawerForm>
    );
  }
  return (
    <ModalForm {...formProps}>
      <ProDescriptions<T, ValueType> {...props} title={null} />
    </ModalForm>
  );
}
