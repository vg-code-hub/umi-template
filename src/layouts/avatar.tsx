/*
 * @Author: zdd
 * @Date: 2024-01-29 16:46:08
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2025-01-06 14:25:55
 * @FilePath: Avatar.tsx
 */
import { LogoutOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Dropdown } from "antd";
import React, { useCallback, useEffect } from "react";
import { history } from "umi";

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const loginOut = async () => {
  history.replace({
    pathname: "/login",
  });
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({}) => {
  const [userInfo, setUserInfo] = React.useState(); // 用于存储用户信息
  useEffect(() => {
    const fetch = async () => {
      const id = localStorage.getItem("id");
      if (id) {
        // const data = await getV2EnterpriseUsersById(Number(id));
        // setUserInfo(data);
      }
    };
    fetch();
  }, []);
  const onMenuClick = useCallback((event: any) => {
    const { key } = event;
    if (key === "logout") {
      return;
    }
    history.push(`/account/${key}`);
  }, []);

  const user = {
    avatar: require("@/assets/avator.png"),
    realName: "xxx",
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
