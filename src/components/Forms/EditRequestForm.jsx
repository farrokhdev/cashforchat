import React from "react";
import { Form, Input, message } from "antd";

const EditRequestForm = ({
  requestID,
  editRequest,
  editRequestError,
  hideEditModal,
  singleRequestData,
  settRefetch,
}) => {
  const edit = async (value) => {
    console.log("first");
    try {
      await editRequest({
        variables: {
          id: requestID,
          input: {
            description: value?.description,
            status: value?.status,
          },
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
      name="edit-request"
      onFinish={edit}
      initialValues={{
        description: singleRequestData?.getSettlementRequest?.description,
        amount: singleRequestData?.getSettlementRequest?.amount,
      }}
    >
      <Form.Item name={"amount"} label="مبلغ">
        <Input />
      </Form.Item>
      <Form.Item name={"description"} label="توضیحات">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default EditRequestForm;
