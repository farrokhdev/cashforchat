import React from "react";
import { Modal, Button } from "antd";

const EditRequestModal = ({ editModal, hideModal, children }) => {
  return (
    <>
      <Modal
        title="بروز رسانی درخواست"
        visible={editModal}
        onCancel={hideModal}
        footer={[
          <>
            <Button
              type="primary"
              form="edit-request"
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

export default EditRequestModal;
