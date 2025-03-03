/*
 * @Author: zdd
 * @Date: 2025-01-06 15:23:01
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2025-03-03 17:30:00
 * @FilePath: .eslintrc.js
 */
module.exports = {
  // Umi 项目
  extends: [require.resolve("umi/eslint")],
  // plugins: ["local-rules"],

  rules: {
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    // "local-rules/no-ts2339": "error",
  },
};
