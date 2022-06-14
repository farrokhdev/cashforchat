import React, { useState } from "react";
import { Button, message, Modal } from "antd";
import { AddUserForm } from "../Forms/AddUserForm";
import { AddUser } from "../../hooks/useUsers";
import { useMutation } from "@apollo/client";

const EditUserModal = ({ editModal, showModal, hideModal, children }) => {
  return (
    <>
      <Modal
        title="بروز رسانی کاربر"
        visible={editModal}
        onCancel={hideModal}
        footer={[
          <>
            <Button type="primary" onClick={hideModal}>
              cancel
            </Button>
            <Button
              type="primary"
              form="edit-user"
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

export default EditUserModal;
