/*
 * @Author: zdd
 * @Date: 2025-01-06 14:10:34
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2025-01-06 16:49:31
 * @FilePath: auto_update.tsx
 */
import { ReloadOutlined } from "@ant-design/icons";
import { message } from "antd";
import React from "react";

interface UpdateContentProps {
  style?: React.CSSProperties;
}
let lastSrcs: string[];
const DURATION = 10000;
const scriptReg = /<script[^>]*src=(?:"|')([^"']*)/gm;

// 获取最新页面中的script链接
async function extractNewScripts() {
  let path = "/?_timestamp=" + Date.now();
  const html = await fetch(path).then((resp) => resp.text());

  scriptReg.lastIndex = 0;
  let result = [];
  let match;

  while ((match = scriptReg.exec(html))) {
    result.push(match[1]);
  }
  return result;
}

async function needUpdate() {
  const newScripts = await extractNewScripts();

  if (!lastSrcs) {
    lastSrcs = newScripts;
    return false;
  }

  let result = false;
  if (lastSrcs.length !== newScripts.length) {
    result = true;
  }
  for (let i = 0; i < lastSrcs.length; i++) {
    if (lastSrcs[i] !== newScripts[i]) {
      result = true;
      break;
    }
  }
  lastSrcs = newScripts;
  return result;
}

function createUpdateContent(props: UpdateContentProps = {}): React.ReactNode {
  return React.createElement(
    "div",
    { style: { cursor: "pointer", ...props.style } },
    "系统有新版本，点击这里更新",
    React.createElement(ReloadOutlined, {
      style: { paddingLeft: "8px" },
    }),
  );
}

function autoUpdateNotify() {
  setInterval(async () => {
    try {
      // 检查当前是否已经存在更新提示消息  如果已存在更新提示，直接返回
      const existingMessage = document.querySelector(
        ".ant-message-notice-content",
      );
      if (existingMessage?.textContent?.includes("系统有新版本")) {
        return;
      }
      const willUpdate = await needUpdate();
      if (willUpdate) {
        message.info({
          content: createUpdateContent(),
          key: "update-notify",
          duration: 0,
          onClick: () => {
            message.loading("正在更新...", 1);
            setTimeout(() => {
              location.reload();
            }, 1000);
          },
        });
      }
    } catch (error) {
      console.error("检查更新出错:", error);
    }
  }, DURATION);
}

autoUpdateNotify();
