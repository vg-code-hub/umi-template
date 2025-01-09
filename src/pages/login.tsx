/*
 * @Author: zdd
 * @Date: 2025-01-07 14:02:50
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2025-01-08 16:41:03
 * @FilePath: login.tsx
 */
import { Button, Row } from "antd";
import { QRCodeSVG } from "qrcode.react";
import { useModel } from "umi";

export default function LoginPage() {
  const { signin } = useModel("user", (model) => ({
    signin: model.signin,
  }));

  function login(role: string) {
    signin(role);
  }
  return (
    <div className="flex flex-col justify-center items-center h-full pb-20">
      <QRCodeSVG value="zdd dongdong@grizzlychina.com" size={220} />
      <h3 className="mt-[16px]">扫码登录</h3>
      <Row>
        {["admin", "guest"].map((role) => (
          <Button type="link" key={role} onClick={() => login(role)}>
            {role}
          </Button>
        ))}
      </Row>
    </div>
  );
}
