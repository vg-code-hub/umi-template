/*
 * @Author: zdd
 * @Date: 2025-01-22 15:09:01
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2025-01-23 12:02:31
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
    open: props.open,
    onOpenChange: props.onOpenChange,
    width: props.width,
    trigger: props.trigger,
    submitter: false,
  } as DrawerFormProps;
  if (props.layoutType === "DrawerForm") {
    return (
      <DrawerForm {...formProps} drawerProps={props.drawerProps}>
        <ProDescriptions<T, ValueType> {...props} title={null} />
      </DrawerForm>
    );
  }
  if (props.layoutType === "ModalForm") {
    return (
      <ModalForm {...formProps} modalProps={props.modalProps}>
        <ProDescriptions<T, ValueType> {...props} title={null} />
      </ModalForm>
    );
  }
}
