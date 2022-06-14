import React, { useState } from "react";
import { Button, message, Modal } from "antd";
import { AddUserForm } from "../Forms/AddUserForm";
import { AddUser } from "../../hooks/useUsers";
import { useMutation } from "@apollo/client";

const AddUserModal = ({ addModal, hideModal, children }) => {
  return (
    <>
      <Modal
        title="ایجاد کاربر جدید"
        visible={addModal}
        onCancel={hideModal}
        footer={[
          <>
            <Button type="primary" onClick={hideModal}>
              cancel
            </Button>
            <Button
              type="primary"
              form="add-user"
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

export default AddUserModal;
