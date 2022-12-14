import React, { useEffect } from "react";
import { Button, Form, Input, InputNumber, message } from "antd";

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

export const EditAdminForm = ({
  AdminID,
  singleAdminData,
  getSingleAdmin,
  singleRefetch,
  refetch,
  update,
  editError,
  hideEditModal,
  form,
}) => {
  const edit = async (value) => {
    try {
      await update({
        variables: {
          id: AdminID,
          input: {
            username: value.username,
            name: value.name,
            family: value.family,
            password: value.password,
            phoneNumber: value.phoneNumber,
          },
        },
      }).then(() => {
        message.success("کاربر با موفقیت بروزرسانی شد");
        hideEditModal();
        form.resetFields();
        refetch();
      });
    } catch (err) {
      console.log(err);
      await message.error(editError?.message);
    }
  };

  return (
    <Form
      name="edit-user"
      form={form}
      onFinish={edit}
      validateMessages={validateMessages}
    >
      <Form.Item
        name={"name"}
        label="نام "
        rules={[
          {
            //required: true,
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
            //required: true,
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
            //required: true,
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
            //required: true,
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
            //required: true,
            min: 0,
            max: 11,
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
