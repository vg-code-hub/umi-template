/*
 * @Author: zdd
 * @Date: 2025-02-26 19:48:49
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2025-03-03 16:30:09
 * @FilePath: rules.ts
 */
import type { Rule } from "eslint";

export default {
  "no-ts2339": {
    meta: {
      type: "problem",
      docs: {
        description: "Detect TS2339 errors",
        // recommended: "error",
      },
      schema: [], // 无配置参数
      messages: {
        propertyNotFound:
          "Property '{{property}}' does not exist on type '{{typeName}}'.",
      },
    },
    create: function (context) {
      // 获取 TypeScript 编译器实例
      const services = context.sourceCode.parserServices;
      const typeChecker = services?.program?.getTypeChecker();

      return {
        // 监听所有成员表达式（如 obj.property）
        MemberExpression(node) {
          if (!typeChecker || node.computed) return;

          const object = services?.esTreeNodeToTSNodeMap.get(node.object);
          const property = node.property;
          if (!object) return; // Add this check

          try {
            // 获取对象类型
            const objectType = typeChecker.getTypeAtLocation(object);
            const propertyName =
              property.type === "Identifier" ? property.name : null;

            if (propertyName) {
              // 检查属性是否存在
              const propertyExists = typeChecker.getPropertyOfType(
                objectType,
                propertyName,
              );
              if (!propertyExists) {
                const typeName = typeChecker.typeToString(objectType);
                context.report({
                  node,
                  messageId: "propertyNotFound",
                  data: {
                    property: propertyName,
                    typeName,
                  },
                });
              }
            }
          } catch (e) {
            // 忽略解析错误
          }
        },
      };
    },
  },
} satisfies Record<string, Rule.RuleModule>;
