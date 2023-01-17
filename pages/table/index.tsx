import useSWR from "swr";
import { apiUrl } from "@/apiUrl/apiUrl";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";
import { useSelector } from "react-redux";

export default function UserTable() {
  interface DataType {
    key: string;
    name: string;
  }
  const token = useSelector((state: any) => state.user.token);

  const fetcher = (url: any) =>
    axios
      .get(url, { headers: { Authorization: "Bearer " + token } })
      .then((res) => res.data);
  const { data: getUser, error } = useSWR(apiUrl.getUser, fetcher);
  if (error) console.log(error);
  if (getUser) console.log(getUser);
  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "firstName",
      key: "firstName",
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
  const data: DataType[] = getUser?.data || [];
  return (
    <div>
      <Table columns={columns} dataSource={data || []} />
    </div>
  );
}
