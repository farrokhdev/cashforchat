import React from "react";
import { Button, Modal } from "antd";
const AddRequestModal = ({ requestModal, hideModal, children }) => {
  return (
    <>
      <Modal
        title="ایجاد درخواست جدید"
        visible={requestModal}
        onCancel={hideModal}
        footer={[
          <>
            <Button
              type="primary"
              form="add-request"
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

export default AddRequestModal;
