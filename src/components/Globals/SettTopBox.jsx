import React, { useState } from "react";
import { Button, message } from "antd";
import AddRequestModal from "../modals/AddRequestModal";
import AddRequestForm from "../Forms/AddRequestForm";

const SettTopBox = ({ users, usersLoading, addRequest, refetch, error }) => {
  const [requestModal, setRequestModal] = useState(false);
  const showModal = () => {
    setRequestModal(true);
  };
  const hideModal = () => {
    setRequestModal(false);
  };

  console.log(users);

  const addSettRequest = async (values) => {
    console.log(values);
    try {
      await addRequest({
        variables: {
          input: {
            userId: values.userId,
            amount: values.amount,
            shebaNo: values.shebaNo,
            creditCardNo: values.creditCardNo,
            bankName: values.bankName,
            status: values.status,
            description: values.description,
          },
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
        <AddRequestForm
          users={users}
          loading={usersLoading}
          onFinish={addSettRequest}
        />
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
