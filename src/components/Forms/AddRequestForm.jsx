import React from "react";
import { Input, Form } from "antd";

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

const AddRequestForm = ({ onFinish }) => {
  return (
    <Form
      name="add-request"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item
        name={"amount"}
        label="مبلغ "
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={"creditCardNo"}
        label="شماره کارت "
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={"shebaNo"}
        label="شماره شبا "
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={"bankName"}
        label="نام بانک "
        rules={[
          {
            // required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={"description"}
        label="توضیحات "
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default AddRequestForm;
