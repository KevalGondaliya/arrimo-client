import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Input, Modal, Row, Space, Spin, Table } from "antd";
import {
  deleteUserApi,
  editUserApi,
  getUserApi,
  setUserApi,
} from "@/store/UserSlice";
import Header from "@/component/header";
import { AppDispatch } from "@/store/Index";
import { PrivateLayout } from "@/component/privateLayout/PrivateLayout";
import styles from "./index.module.scss";

export default function UserTable() {
  interface DataType {
    isDelete: any;
    id: number;
    key: string;
    name: string;
  }
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const gerUserData: DataType[] = useSelector(
    (state: any) => state.user.userData
  );
  const loader = useSelector((state: any) => state.user.isLoading);
  const logInUserRole = useSelector(
    (state: any) => state.user.logInUserData.role
  );
  const router = useRouter();
  const handleAddUser = () => {
    setIsModalOpen(true);
  };
  useEffect(() => {
    if (logInUserRole === "user") {
      router.push({
        pathname: "/calander",
      });
    } else dispatch(getUserApi());
  }, []);

  // For Submit Form And Dispatch Add User Action Calling And Close Modal
  const handleOnFinish = (values: any) => {
    values.role = "user";
    values.password = "123456";
    const onSuccessCallback = (res: any) => {
      if (res === 200) {
        setIsEdit(false);
        setEditData(null);
        setIsModalOpen(false);
        form.resetFields();
      }
    };
    if (isEdit) {
      dispatch(editUserApi(values, editData?.id, onSuccessCallback));
    } else {
      dispatch(setUserApi(values, onSuccessCallback));
    }
  };

  // For Close Modal
  const handleCancel = () => {
    setEditData(null);
    setIsModalOpen(false);
    form.resetFields();
  };

  // For Edit User And Set Edit User Data
  const handleOnEdit = (item: any) => {
    form.setFieldsValue(item);
    setEditData(item);
    setIsEdit(true);
    setIsModalOpen(true);
  };

  // For Dispatch User Delete Api Action
  const handleOnDelete = (id: number) => {
    dispatch(deleteUserApi(id));
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Active",
      dataIndex: "isDelete",
      key: "isDelete",
      render: (text) => <a>{text ? "inActive" : "Active"}</a>,
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        !record?.isDelete && (
          <Space size="middle">
            <Button onClick={() => handleOnEdit(record)}>Edit</Button>
            <Button onClick={() => handleOnDelete(record.id)}>Delete</Button>
          </Space>
        ),
    },
  ];

  return (
    <PrivateLayout>
      <Row justify="center">
        <Col xxl={24}>
          <Header />
        </Col>
        <Col xxl={22} className={styles.userButton}>
          <Button onClick={handleAddUser}>Add User</Button>
        </Col>
        <Col xxl={22}>
          {loader ? (
            <Spin />
          ) : (
            <Table columns={columns} dataSource={gerUserData || []} />
          )}
        </Col>
      </Row>
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
          autoComplete="off"
        >
          <Form.Item
            label="First Name"
            className={styles.labelClr}
            name="firstName"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
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
            <Input disabled={isEdit} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button loading={loader} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PrivateLayout>
  );
}
