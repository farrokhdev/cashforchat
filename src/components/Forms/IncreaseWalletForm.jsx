import React from "react";
import { Button, Form, Input, InputNumber } from "antd";

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

export const IncreaseWalletForm = ({ onFinish, wallet }) => {
  return (
    <Form
      name="update-wallet-form"
      onFinish={onFinish}
      validateMessages={validateMessages}
      initialValues={{
        wallet: wallet,
      }}
    >
      <Form.Item
        name={"wallet"}
        label="افزایش موجودی"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      {/* <Form.Item>
        <Button type="primary" htmlType="submit">
          ثبت
        </Button>
      </Form.Item> */}
    </Form>
  );
};
