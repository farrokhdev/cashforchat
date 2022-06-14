import React, { useState } from "react";
import { Button, message, Modal } from "antd";
import { AddUserForm } from "../Forms/AddUserForm";
import { AddUser } from "../../hooks/useUsers";
import { useMutation } from "@apollo/client";

const DecreamentWalletModal = ({
  visible,
  openModal,
  closeModal,
  children,
}) => {
  return (
    <>
      <Modal
        title="فرم کاهش موجودی"
        visible={visible}
        onCancel={closeModal}
        footer={[
          <>
            <Button type="primary" onClick={closeModal}>
              cancel
            </Button>
            <Button
              type="primary"
              form="decreament-update-wallet-form"
              key="submit"
              htmlType="submit"
            >
              ok
            </Button>
          </>,
        ]}
      >
        {children}
      </Modal>
    </>
  );
};

export default DecreamentWalletModal;
