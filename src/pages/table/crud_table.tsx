import type {
  ProColumns,
  ProDescriptionsItemProps,
  ProFormColumnsType,
  ProSchemaComponentTypes,
} from "@ant-design/pro-components";
import { Button, Space, Tag, Typography } from "antd";
import type { ProCrudDetailProps, ProCrudFormProps } from "u-view";
import { ProCrud, ProCrudDetail, ProCrudForm } from "u-view";
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
    render: (
      dom: any,
      row: GithubIssueItem,
      index: number,
      action: any,
      schema: { type: ProSchemaComponentTypes }
    ) => {
      if (schema.type === "descriptions") return row.title;
      return (
        <ProCrudDetail
          {...detailProps}
          dataSource={row}
          trigger={
            <Typography.Paragraph
              className="text-primary cursor-default whitespace-pre-wrap !mb-0"
              ellipsis={{
                rows: 2,
                expandable: "collapsible",
                onExpand: (e) => {
                  e.stopPropagation();
                },
              }}
              copyable
              title={row.title}
            >
              {row.title}
            </Typography.Paragraph>
          }
        />
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
    valueEnum: {
      bug: "bug",
      question: "question",
      dependencies: "dependencies",
      InProgress: "In Progress",
      FeatureRequest: "Feature Request",
    },
    convertValue: (value) => {
      return value?.length > 0 ? value[0].name : undefined;
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
      <ProCrudForm {...formProps} initialValues={row} />,
      <ProCrudDetail {...detailProps} dataSource={row} />,
    ],
  },
];

const detailProps: ProCrudDetailProps<GithubIssueItem> = {
  style: { background: "#fff" },
  title: "详情",
  width: "60%",
  layoutType: "DrawerForm",
  column: 2,
  trigger: <a>查看</a>,
  columns: columns as ProDescriptionsItemProps<GithubIssueItem>[],
};

const formProps: ProCrudFormProps<GithubIssueItem> = {
  width: "60%",
  layoutType: "ModalForm",
  layout: "horizontal",
  rowProps: { gutter: [16, 16] },
  colProps: { span: 12 },
  grid: true,
  title: "编辑",
  trigger: <a key="editable">编辑</a>,
  columns: columns as ProFormColumnsType<GithubIssueItem>[],
};

export default () => {
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
      toolBarRender={() => [
        <ProCrudForm
          {...formProps}
          trigger={<Button type="primary">新增</Button>}
        />,
      ]}
      dateFormatter="string"
      headerTitle="CRUD Table"
    />
  );
};
