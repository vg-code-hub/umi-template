#!/bin/bash
###
# @Author: zdd
# @Date: 2025-02-26 22:03:46
# @LastEditors: zdd dongdong@grizzlychina.com
# @LastEditTime: 2025-03-03 18:02:34
# @FilePath: check-tsc.sh
###

check_rule="TS2339"
# 运行 tsc 并捕获输出
tsc_output=$(tsc 2>&1)

# ANSI 颜色代码
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # 无颜色

# 检查输出中是否包含 TS2339 错误
if echo "$tsc_output" | grep -E -q $check_rule; then
  echo ""
  echo "$tsc_output" | grep -E $check_rule
  echo "${RED}${check_rule} error detected in tsc output.${NC}"
  exit 1 # 检测到 TS2339 错误，退出并返回 1
else
  echo "${GREEN}No ${check_rule} errors detected. Exiting normally.${NC}"
  exit 0 # 没有检测到错误，正常退出
fi
