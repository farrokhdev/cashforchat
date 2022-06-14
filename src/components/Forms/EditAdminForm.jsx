import React, { useEffect } from "react";
import { Button, Form, Input, InputNumber, message } from "antd";

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

export const EditAdminForm = ({
  onFinish,
  userID,
  singleAdminData,
  getSingleAdmin,
  singleRefetch,
  refetch,
  update,
  editError,
  hideEditModal,
}) => {
  useEffect(() => {
    try {
      getSingleAdmin({
        variables: {
          id: userID,
        },
      }).then(() => {
        singleRefetch();
      });
    } catch (err) {
      console.log(err);
    }
  }, [userID]);

  const edit = (value) => {
    try {
      update({
        variables: {
          id: userID,
          username: value.username,
          name: value.name,
          family: value.family,
          phoneNumber: value.phoneNumber,
        },
      }).then(() => {
        message.success("کاربر با موفقیت بروزرسانی شد");
        hideEditModal();
        refetch();
      });
    } catch (err) {
      console.log(err);
      message.error(editError.message);
    }
  };

  return (
    <Form
      name="edit-user"
      onFinish={edit}
      validateMessages={validateMessages}
      initialValues={{
        username: singleAdminData?.getAdmin.username,
        name: singleAdminData?.getAdmin.name,
        family: singleAdminData?.getAdmin.family,
        phoneNumber: singleAdminData?.getAdmin.phoneNumber,
      }}
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

      {/* <Form.Item>
        <Button type="primary" htmlType="submit">
          ثبت
        </Button>
      </Form.Item> */}
    </Form>
  );
};
