import React from "react";
import { Button, Form, Input, InputNumber } from "antd";

const validateMessages = {
  required: "${label} پر کردن این فیلد ضروری میباشد!",
  types: {
    email: "${label} ایمیل معتبر نمیباشد!",
    number: "${label} شماره تلفن معتبر نیست!",
  },
  number: {
    range: "${label} باید بین ${min} و ${max} باشد",
  },
};
export const DecreamentWalletForm = ({ onFinish, wallet }) => {
  return (
    <Form
      name="decreament-update-wallet-form"
      onFinish={onFinish}
      validateMessages={validateMessages}
      initialValues={{
        wallet: wallet,
      }}
    >
      <Form.Item
        name={"wallet"}
        label="کاهش موجودی"
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
