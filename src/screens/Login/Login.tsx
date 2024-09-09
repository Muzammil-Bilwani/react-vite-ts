import type { FormProps } from "antd";
import { Button, Card, Col, Form, Input, message, Row } from "antd";
import Title from "antd/es/typography/Title";
import { useMutation } from "react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_KEY, setItem } from "../../services/localStorage";
import { login } from "../../api/auth";

type FieldType = {
  email?: string;
  password?: string;
};

const Login = () => {
  const { mutateAsync, error, isLoading } = useMutation(login);
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    if (values.email && values.password) {
      const data = await mutateAsync({
        email: values.email,
        password: values.password,
      });
      if (data) {
        message.success("Login Successful");
        setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, data.data.token);
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    }
  };

  useEffect(() => {
    if (error) {
      message.error("Invalid email or password");
    }
  }, [error]);

  return (
    <Row
      style={{
        height: "100%",
      }}
      align="middle"
      justify="center"
    >
      <Col xs={20} sm={16} md={12} lg={8} xl={8}>
        <Card>
          {/* <Logo /> */}
          <Title level={3}>Welcome</Title>
          <Form
            layout="vertical"
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                {
                  type: "email",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button
                loading={isLoading}
                block
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
