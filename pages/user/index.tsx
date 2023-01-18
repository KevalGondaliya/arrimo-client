import useSWR from "swr";
import { useState } from "react";
import { apiUrl } from "@/apiUrl/apiUrl";
import { Button, Col, Form, Input, Modal, Row, Select, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

import { fetcher } from "@/utils/fetch";

import styles from "./index.module.scss";
import { PrivateLayout } from "@/privateLayout/PrivateLayout";

export default function UserTable() {
  interface DataType {
    key: string;
    name: string;
  }

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: getUser } = useSWR(apiUrl.getUser, (url) => fetcher(url));

  const handleAddUser = () => {
    setIsModalOpen(true);
  };
  const handleOnFinish = (values: any) => {
    values.role = "User"
    console.log(values);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

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
    <PrivateLayout>
  <div>
      <Row>
        <Col>
          <Button onClick={handleAddUser}>Add User</Button>
        </Col>
      </Row>
      <Table columns={columns} dataSource={data || []} />
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        footer={false}
        onCancel={() => handleCancel()}
      >
        <Form
          onFinish={handleOnFinish}
          name="basic"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="First Name"
            className={styles.labelClr}
            name="firstName"
            rules={[{ required: true, message: "Please input your first name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            className={styles.labelClr}
            name="lastName"
            rules={[{ required: true, message: "Please input your last name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            className={styles.labelClr}
            rules={[{ required: true, message: "Please input your email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            className={styles.labelClr}
            rules={[{ required: true, message: "Please input your email" }]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            label="Role"
            name="role"
            className={styles.labelClr}
            rules={[{ required: true, message: "Please input your role!" }]}
          >
            <Select
            placeholder="select"
              defaultValue=""
              className={styles.roleSelect}
              style={{ width: 120 }}
              options={[
                {
                  value: "admin",
                  label: "admin",
                },
                {
                  value: "user",
                  label: "user",
                },
              ]}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
    </PrivateLayout>
  
  );
}
