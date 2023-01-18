import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, notification } from "antd";
import { getLocalStorageValue } from "@/utils/localStorage";
import { AppDispatch } from "../../store/Index";
import { loginApi } from "../../store/userSlice";
import styles from "./index.module.scss";

export default function Login() {
  const router = useRouter();
  const token = getLocalStorageValue();
  const dispatch: AppDispatch = useDispatch();

  const loader = useSelector((state: any) => state.user.isLoading);
  const logInUserRole = useSelector(
    (state: any) => state.user.logInUserData.role
  );

  useEffect(() => {
    if (token) {
      router.push({
        pathname: "/user",
      });
    }
  }, []);

  const onFinish = (values: any) => {
    const onSuccessCallback = (response: any) => {
      if (response === 200) {
        router.push({
          pathname: logInUserRole === "admin" ? "/user" : "/calander",
        });
      } else {
        notification.error({
          message: "User Does Not Exist",
        });
      }
    };
    dispatch(loginApi(values, onSuccessCallback));
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
            <Button
              loading={loader}
              className={styles.sbmtBtn}
              type="primary"
              htmlType="submit"
            >
              Log In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
