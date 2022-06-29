import React from "react";
import { Form, Input, message, Select, Spin } from "antd";

const { Option } = Select;

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
const EditRequestForm = ({
  form,
  requestID,
  editRequest,
  editRequestError,
  hideEditModal,
  singleRequestData,
  settRefetch,
  loading,
  users,
}) => {
  const edit = async (value) => {
    console.log(value);
    try {
      await editRequest({
        variables: {
          input: {
            ...value,
          },
          id: requestID,
        },
      }).then(() => {
        message.success("درخواست با موفقیت بروزرسانی شد");
        hideEditModal();
        settRefetch();
      });
    } catch (err) {
      console.log(err);
      await message.error(editRequestError.message);
    }
  };
  //   console.log(singleRequestData?.getSettlementRequest);
  return (
    <Form
      form={form}
      name="edit-request"
      onFinish={edit}
      validateMessages={validateMessages}
    >
      <Form.Item name={"userId"} label="کاربر ">
        {loading ? (
          <Spin spinning={loading} />
        ) : (
          <Select defaultValue={"انتخاب کاربر"}>
            {users.map((user) => {
              return <Option value={user._id}>{user.fullName}</Option>;
            })}
          </Select>
        )}
      </Form.Item>
      <Form.Item name={"amount"} label="مبلغ ">
        <Input />
      </Form.Item>
      <Form.Item name={"creditCardNo"} label="شماره کارت ">
        <Input />
      </Form.Item>
      <Form.Item name={"shebaNo"} label="شماره شبا ">
        <Input />
      </Form.Item>
      <Form.Item name={"bankName"} label="نام بانک ">
        <Input />
      </Form.Item>
      <Form.Item name={"description"} label="توضیحات ">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default EditRequestForm;
