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

export const EditUserCatForm = ({
  userCatID="",
  getSingleUserCat="",
  singleCatRefetch="",
  singleUserCatData="",
  refetch="",
  update="",
  editError="",
  hideEditModal="",
}) => {

  const edit = async (value) => {
    try {
      await update({
        variables: {
          id: userCatID,
          title: value.title,
          key: value.key,
          description: value.description,
        },
      }).then(() => {
        message.success("دسته بندی کاربر با موفقیت بروزرسانی شد");
        hideEditModal();
        refetch();
      });
    } catch (err) {
      console.log(err);
      await message.error(editError.message);
    }
  };
  // console.log(singleUserCatData?.getUserCategory?.title)
  // console.log(userCatID)
  return (
    <Form
      name="edit-user-cat"
      onFinish={edit}
      validateMessages={validateMessages}
      initialValues={{
        title: singleUserCatData?.getUserCategory?.title,
        key: singleUserCatData?.getUserCategory?.key,
        description: singleUserCatData?.getUserCategory?.description,
      }}
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
