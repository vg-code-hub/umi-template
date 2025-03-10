/*
 * @Author: zdd
 * @Date: 2025-01-06 14:29:34
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2025-01-06 16:52:22
 * @FilePath: collapsed.tsx
 */
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";

interface LayoutCollapsedProps {
  collapsed?: boolean;
  setCollapsed: (value: boolean) => void;
}
const LayoutCollapsed: React.FC<LayoutCollapsedProps> = (props) => {
  return (
    <div
      className="h-[40px] flex items-center"
      style={{
        borderTop: "1px solid #e8e8e8",
      }}
    >
      <div className="pl-[20px]">
        {props.collapsed ? (
          <DoubleLeftOutlined
            onClick={() => props.setCollapsed(!props.collapsed)}
          />
        ) : (
          <DoubleRightOutlined
            onClick={() => props.setCollapsed(!props.collapsed)}
          />
        )}
      </div>
    </div>
  );
};

export default LayoutCollapsed;
