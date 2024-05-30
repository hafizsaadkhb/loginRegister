import React from "react";
import { Button, Form, Input, message } from "antd";
import axios from "axios";

function Login() {
  const onFinish = async (values) => {
    console.log("Form values submitted:", values);

    try {
      const response = await axios.post('https://login-register-au26.vercel.app/login', values);

      console.log("Response from backend:", response.data);

      if (response.status === 200) {
        message.success('Login successful!');
        // Redirect to dashboard or another page if needed
        // window.location.href = '/dashboard';
      } else {
        message.error('Login failed');
      }
    } catch (error) {
      console.error("Error posting data:", error);
      message.error('An error occurred during login. Please try again.');
    }
  };
  
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
    <div className="flex w-[100%] h-[100vh] justify-center items-center bg-[#ff0]">
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
    </div>
  );
}

export default Login;
