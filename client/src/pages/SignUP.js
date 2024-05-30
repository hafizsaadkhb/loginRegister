import React from "react";
import { Button, Form, Input, message } from "antd";
import axios from "axios"; // Import Axios

function SignUp() {
  const onFinish = async (values) => {
    console.log("Form values submitted:", values);

    try {
      const response = await axios.post('http://localhost:5000/register', values, {
        // withCredentials: true // Include credentials (cookies) with the request
      });

      console.log("Response from backend:", response.data);

      if (response.status === 200) {
        message.success('Registration successful!');
        // Redirect to login or another page if needed
        // window.location.href = '/login';
      } else {
        message.error('Registration failed');
      }
    } catch (error) {
      console.error("Error posting data:", error);
      message.error('An error occurred during registration. Please try again.');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Form submission failed:", errorInfo);
    message.error('Failed to submit the form. Please check the inputs.');
  };

  return (<div>
    <div className="flex w-full h-[100vh] justify-center items-center bg-[#f00]">
      <Form
        name="register"
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
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
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
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: "Please input your address!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
              type: 'email'
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Designation"
          name="designation"
          rules={[
            {
              required: true,
              message: "Please input your designation!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Department"
          name="department"
          rules={[
            {
              required: true,
              message: "Please input your department!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
    </div>
  );
}

export default SignUp;
