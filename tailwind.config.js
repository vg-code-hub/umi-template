/*
 * @Author: zdd
 * @Date: 2025-01-06 14:09:36
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2025-01-06 18:02:01
 * @FilePath: tailwind.config.js
 */
module.exports = {
  content: [
    "./src/pages/**/*.tsx",
    "./src/components/**/*.tsx",
    "./src/layouts/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2353a6",
      },
    },
  },
};
