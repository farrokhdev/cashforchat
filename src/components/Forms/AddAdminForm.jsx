import React from "react";
import { Button, Form, Input, InputNumber } from "antd";
import Password from "antd/lib/input/Password";

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

export const AddAdminForm = ({ onFinish }) => {
  return (
    <Form
      name="add-user"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item
        name={"name"}
        label="نام "
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={"username"}
        label="نام کاربری"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={"family"}
        label="نام خانوادگی"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={"password"}
        label="کلمه عبور"
        rules={[
          {
            type: Password,
            required: true,
            min: 8,
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name={"phoneNumber"}
        label="شماره تماس"
        rules={[
          {
            required: true,
            min: 0,
            max: 11,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={"role"}
        label="نقش"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      {/* <Form.Item>
        <Button type="primary" htmlType="submit">
          ثبت
        </Button>
      </Form.Item> */}
    </Form>
  );
};
