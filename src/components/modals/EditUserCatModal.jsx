import React, { useState } from "react";
import { Button, message, Modal } from "antd";
import { AddUserForm } from "../Forms/AddUserForm";
import { AddUser } from "../../hooks/useUsers";
import { useMutation } from "@apollo/client";

const EditUserCatModal = ({ visible, closeModal, children }) => {
  return (
    <>
      <Modal
        title="بروزرسانی دسته بندی کاربر"
        visible={visible}
        onCancel={closeModal}
        footer={[
          <>
            <Button type="primary" onClick={closeModal}>
              cancel
            </Button>
            <Button
              type="primary"
              form="edit-user-cat"
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

export default EditUserCatModal;
