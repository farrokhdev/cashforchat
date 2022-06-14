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

export const AddUserCatForm = ({ onFinish }) => {
  return (
    <Form
      name="add-user"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item
        name={"title"}
        label="عنوان "
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={"key"}
        label="کلید واژه "
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={"description"}
        label="توضیحات"
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
