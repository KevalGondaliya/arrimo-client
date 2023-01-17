import useSWR from "swr";
import { apiUrl } from "@/apiUrl/apiUrl";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

export default function UserTable() {
  interface DataType {
    key: string;
    name: string;
  }
  const { data: userData, error } = useSWR(apiUrl.getUser);
  console.log(userData);

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a> Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
    },
    {
      key: "2",
      name: "Jim Green",
    },
    {
      key: "3",
      name: "Joe Black",
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
