/*
 * @Author: zdd
 * @Date: 2023-05-17 15:58:43
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2025-01-08 14:12:08
 * @FilePath: 404.tsx
 * @Description:
 */
import { Button, Result } from "antd";
import { history, IRoute } from "umi";

const NoFoundPage = () => {
  return (
    <Result
      status={"404"}
      title={"404"}
      subTitle={"抱歉，你访问的页面不存在"}
      extra={
        <Button type="primary" onClick={() => history.push("/")}>
          返回首页
        </Button>
      }
    />
  );
};

export default NoFoundPage;
