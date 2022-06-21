import React, { useState } from "react";
import { Button, message } from "antd";
import AddRequestModal from "../modals/AddRequestModal";
import AddRequestForm from "../Forms/AddRequestForm";

const SettTopBox = ({ addRequest, refetch, error }) => {
  const [requestModal, setRequestModal] = useState(false);
  const showModal = () => {
    setRequestModal(true);
  };
  const hideModal = () => {
    setRequestModal(false);
  };

  const addSettRequest = (values) => {
    try {
      addRequest({
        variables: {
          amount: values.amount,
          shebaNo: values.shebaNo,
          creditCardNo: values.creditCardNo,
          bankName: values.bankName,
          status: values.status,
          description: values.description,
        },
      }).then(() => {
        message.success("درخواست با موفقیت ساخته شد");
        hideModal();
        refetch();
      });
    } catch (err) {
      console.log(err);
      message.error(error?.message ? error?.message : "خطا مجددا تلاش کنید");
    }
  };

  return (
    <>
      <AddRequestModal hideModal={hideModal} requestModal={requestModal}>
        <AddRequestForm onFinish={addSettRequest} />
      </AddRequestModal>
      <div className="top-box">
        <div className="create-btn">
          <Button type="primary" onClick={showModal}>
            ایجاد درخواست
          </Button>
        </div>
      </div>
    </>
  );
};

export default SettTopBox;
