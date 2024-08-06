"use client"
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [form] = Form.useForm<LoginFormValues>();

  const onFinish = (values: LoginFormValues) => {
    // Handle login logic here
    console.log('Received values:', values);
    // Replace with your actual login logic
    message.success('Login successful!');
  };

  return (
    <div className="login-container">
      <Form
        form={form}
        name="login"
        onFinish={onFinish}
        layout="vertical"
        style={{ maxWidth: 300 }}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Invalid email format' },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>

        <Form.Item>
          <Link href="/signup">Don't have an account? Signup</Link>
        </Form.Item>

        <Form.Item>
          {/* Add your Google login button here */}
          <Button type="default" block>
            Login with Google
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
