import type {
  ProColumns,
  ProDescriptionsItemProps,
  ProFormColumnsType,
  ProSchemaComponentTypes,
} from "@ant-design/pro-components";
import { Button, Space, Tag, Typography } from "antd";
import { useRef } from "react";
import type { ProCrudRefType } from "u-view";
import { ProCrud } from "u-view";
import { request } from "umi";

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

const tagColorMap = {
  bug: "error",
  question: "success",
  dependencies: "default",
  "In Progress": "processing",
  "Feature Request": "default",
};

export default () => {
  const crudRef = useRef<ProCrudRefType<GithubIssueItem>>();
  const columns: Partial<
    | ProColumns<GithubIssueItem>
    | ProFormColumnsType<GithubIssueItem>
    | ProDescriptionsItemProps<GithubIssueItem>
  >[] = [
    {
      title: "序号",
      dataIndex: "index",
      width: 64,
      valueType: "indexBorder",
    },
    {
      title: "标题",
      dataIndex: "title",
      copyable: true,
      ellipsis: true,
      search: false,
      // width: 350,
      formItemProps: {
        rules: [
          {
            required: true,
            message: "此项为必填项",
          },
        ],
      },
      render: (
        dom: any,
        row: GithubIssueItem,
        index: number,
        action: any,
        schema: { type: ProSchemaComponentTypes },
      ) => {
        if (schema.type === "descriptions") return row.title;
        return (
          <Typography.Paragraph
            className="text-primary cursor-default whitespace-pre-wrap !mb-0"
            ellipsis={{
              rows: 2,
              expandable: "collapsible",
              onExpand: (e) => {
                e.stopPropagation();
              },
            }}
            onClick={() => {
              crudRef.current?.setDetailOpen(row);
            }}
            copyable
            title={row.title}
          >
            {row.title}
          </Typography.Paragraph>
        );
      },
    },
    {
      title: (_: any, type: ProSchemaComponentTypes) =>
        type === "table" ? "状态" : "列表状态",
      dataIndex: "state",
      initialValue: "all",
      filters: true,
      onFilter: true,
      valueType: "select",
      valueEnum: {
        all: { text: "全部", status: "Default" },
        open: {
          text: "未解决",
          status: "Error",
        },
        closed: {
          text: "已解决",
          status: "Success",
        },
      },
    },
    {
      title: "排序方式",
      key: "direction",
      hideInTable: true,
      hideInDescriptions: true,
      hideInForm: true,
      dataIndex: "direction",
      filters: true,
      onFilter: true,
      valueType: "select",
      valueEnum: {
        asc: "正序",
        desc: "倒序",
      },
    },
    {
      title: "创建时间",
      key: "showTime",
      dataIndex: "created_at",
      valueType: "date",
      sorter: true,
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "创建时间",
      dataIndex: "created_at",
      valueType: "dateRange",
      hideInTable: true,
      hideInForm: true,
      hideInDescriptions: true,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
    {
      title: "标签",
      dataIndex: "labels",
      width: 160,
      valueType: "select",
      fieldProps: {
        options: [...Object.keys(tagColorMap)],
      },
      convertValue: (value) => {
        return value?.length > 0 ? value[0].name : undefined;
      },
      transform: (value, labelName) => {
        if (Array.isArray(value)) {
          return { [labelName]: value };
        }
        if (typeof value === "string") {
          return {
            [labelName]: [
              {
                color: tagColorMap[value as keyof typeof tagColorMap],
                name: "question",
              },
            ],
          };
        }
      },
      render: (_: any, row: GithubIssueItem) => (
        <Space>
          {row.labels.map(({ name, color }) => (
            <Tag color={color} key={name}>
              {name}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "操作",
      valueType: "option",
      dataIndex: "id",
      hideInDescriptions: true,
      width: 200,
      render: (_: any, row: GithubIssueItem) => [
        <Button
          onClick={() => {
            crudRef.current?.setFormOpen(row);
          }}
          key="edit"
          type="link"
        >
          编辑
        </Button>,
        <Button
          onClick={() => {
            crudRef.current?.setDetailOpen(row);
          }}
          type="link"
          key="view"
        >
          查看
        </Button>,
      ],
    },
  ];
  return (
    <ProCrud<GithubIssueItem>
      columns={columns as ProColumns<GithubIssueItem>[]}
      request={async (params = {} as Record<string, any>) =>
        request<{
          data: GithubIssueItem[];
        }>("https://proapi.azurewebsites.net/github/issues", {
          params,
        })
      }
      pagination={{
        pageSize: 20,
      }}
      rowKey="id"
      crudRef={crudRef}
      formConfig={{
        onFinish: async (values: GithubIssueItem) => {
          console.log(values);

          return true;
        },
      }}
      toolBarRender={() => [
        <Button
          onClick={() => {
            crudRef.current?.setFormOpen();
          }}
          key="create"
          type="primary"
        >
          新增
        </Button>,
      ]}
      dateFormatter="string"
      headerTitle="CRUD Table"
    />
  );
};
