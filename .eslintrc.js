/*
 * @Author: zdd
 * @Date: 2025-01-06 15:23:01
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2025-02-27 11:04:19
 * @FilePath: .eslintrc.js
 */
module.exports = {
  // Umi 项目
  extends: require.resolve('umi/eslint'),
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
  },
};
