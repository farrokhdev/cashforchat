import React from "react";
import { Button, Modal } from "antd";

const EditUserModal = ({ editModal, hideModal, children }) => {
  return (
    <>
      <Modal
        title="بروز رسانی کاربر"
        visible={editModal}
        onCancel={hideModal}
        footer={[
          <>
            <Button
              type="primary"
              form="edit-user"
              key="submit"
              htmlType="submit"
            >
              ثبت
            </Button>
            <Button type="primary" onClick={hideModal}>
              انصراف
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
