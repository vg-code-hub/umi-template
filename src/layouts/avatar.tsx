/*
 * @Author: zdd
 * @Date: 2024-01-29 16:46:08
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2025-01-07 14:10:15
 * @FilePath: avatar.tsx
 */
import { LogoutOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Dropdown } from "antd";
import React, { useCallback } from "react";
import { history } from "umi";

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({}) => {
  const onMenuClick = useCallback((event: any) => {
    const { key } = event;
    if (key === "logout") {
      history.replace({
        pathname: "/login",
      });
      return;
    }
  }, []);

  const user = {
    avatar: require("@/assets/avatar.png"),
    realName: "吴彦祖",
  };
  const items: MenuProps["items"] = [
    {
      key: "logout",
      danger: true,
      icon: <LogoutOutlined />,
      onClick: onMenuClick,
      label: "退出登录",
    },
  ];
  return (
    <Dropdown menu={{ items }}>
      <span className="mr-4">
        <Avatar size="small" className="" src={user?.avatar} alt="avatar" />
        <span className="text-block ml-2 cursor-pointer">{user?.realName}</span>
      </span>
    </Dropdown>
  );
};

export default AvatarDropdown;
