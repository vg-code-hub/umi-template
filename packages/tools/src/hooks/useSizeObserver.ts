/*
 * @Author: zdd
 * @Date: 2024-09-20 11:20:58
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2025-01-06 11:37:49
 * @FilePath: useSizeObserver.ts
 */

import { RefObject, useEffect, useState } from "react";

type ParentElement = Pick<HTMLElement, "querySelector" | "querySelectorAll">;

export function useProTableSizeObserver<T>(
  actionRef: RefObject<T>,
  {
    totalHeight,
    wrapId,
    bottom,
  }: {
    wrapId?: string;
    totalHeight?: string;
    bottom?: number;
  }
) {
  totalHeight ??= "100vh";
  bottom ??= 32;
  const [searchH, setSearchH] = useState<number>(80);

  const getWrapSelector = (selector: string) =>
    wrapId ? `#${wrapId} .ant-pro-table ${selector}` : selector;

  const querySelector = (selector: string) => {
    let parentElement: ParentElement = document;
    if (wrapId) {
      parentElement = document.getElementById(wrapId) as ParentElement;
    }
    let nodeList = Array.from(
      parentElement.querySelectorAll<HTMLDivElement>(getWrapSelector(selector))
    );
    if (nodeList.length > 0) {
      return nodeList[nodeList.length - 1];
    }
  };

  useEffect(() => {
    if (!actionRef.current) return;

    let observer: ResizeObserver | undefined;
    let tableSearch: HTMLDivElement | undefined;
    let tableHeader: HTMLDivElement | undefined;
    let tableCardBody: HTMLDivElement | undefined;
    setTimeout(() => {
      tableSearch = querySelector(".ant-pro-table-search");
      tableHeader = querySelector(".ant-table-header");
      tableCardBody = querySelector(".ant-pro-card-body")!;

      observer = new ResizeObserver(() => {
        if (tableHeader && tableCardBody)
          calcTableHeight(tableHeader, tableCardBody);
      });
      if (tableSearch) observer.observe(tableSearch);
      if (tableHeader) observer.observe(tableHeader);
      if (tableCardBody) observer.observe(tableCardBody);
    }, 100);

    return () => {
      if (observer) {
        if (tableSearch) observer.unobserve(tableSearch);
        if (tableHeader) observer.unobserve(tableHeader);
        if (tableCardBody) observer.unobserve(tableCardBody);
      }
    };
  }, [actionRef]);

  function calcTableHeight(
    tableHeader: HTMLDivElement,
    tableCardBody: HTMLDivElement
  ) {
    let otherH = 0;

    const { bottom } = tableHeader.getBoundingClientRect();
    const { paddingBlockEnd } = getComputedStyle(tableCardBody, null);
    otherH = bottom + parseInt(paddingBlockEnd);

    const tablePagination = querySelector(".ant-table-pagination");
    if (tablePagination) {
      otherH += tablePagination?.offsetHeight ?? 24;
      const { marginTop } = getComputedStyle(tablePagination, null);
      otherH += parseInt(marginTop);
    }
    setSearchH(otherH);
  }

  return {
    // 冗余高度: 4px
    tableScrollY: `calc(${totalHeight} - ${bottom}px - ${searchH}px - 4px)`,
  };
}
