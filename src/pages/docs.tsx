/*
 * @Author: zdd
 * @Date: 2025-03-03 14:14:48
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2025-03-03 18:05:23
 * @FilePath: docs.tsx
 */
import {} from "./test";

interface User {
  smsCode?: string;
}

const user: User = { smsCode: "1" };

const DocsPage = () => {
  let _a = "";

  console.log(user.code);
  console.log(user.smsCode);

  return (
    <div>
      <p>This is umi docs.</p>
    </div>
  );
};

export default DocsPage;
