import { Button, Form, Input, notification, Select } from "antd";
import { useRouter } from "next/router";

import styles from "./index.module.scss";
import { loginApi } from "../store/UserSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/Index";

export default function Login() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const onFinish = (values: any) => {
    const onSuccessCallback = (response: any) => {
      if (response === 200) {
        router.push({
          pathname: "/table",
        });
      } else {
        notification.error({
          message: "User Does Not Exist",
        });
      }
    };
    dispatch(loginApi(values, onSuccessCallback));
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className={styles.mainPage}>
      <div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            className={styles.labelClr}
            name="email"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            className={styles.labelClr}
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button className={styles.sbmtBtn} type="primary" htmlType="submit">
              Log In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
