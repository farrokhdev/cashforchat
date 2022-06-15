import React, { useEffect, useState } from "react";
import { Button, Input, Dropdown, Menu, Space, message } from "antd";
import AddAdminModal from "../modals/AddAdminModal";
import { AddAdminForm } from "../Forms/AddAdminForm";

const { Search } = Input;

export const AdminTopBox = ({
  searchText,
  btnText,
  filterUsers = "",
  refetch = "",
  error = "",
  createAdmin = "",
  userID,
}) => {
  // MODAL OPRATIONS
  const [addModal, setAddModal] = useState(false);
  const showModal = () => {
    setAddModal(true);
  };
  const hideModal = () => {
    setAddModal(false);
  };
  // MODAL OPRATIONS END

  const addUser = async (values) => {
    try {
      await createAdmin({
        variables: {
          name: values.name,
          username: values.username,
          family: values.family,
          password: values.password,
          phoneNumber: values.phoneNumber,
          role: values.role,
        },
      }).then(() => {
        message.success("ادمین با موفقیت ساخته شد");
        hideModal();
        refetch();
      });
    } catch (err) {
      console.log(err);
      await message.error(error?.message);
    }
  };
  return (
    <>
      {/* ADD USER MODAL */}
      <AddAdminModal addModal={addModal} hideModal={hideModal}>
        <AddAdminForm onFinish={addUser} />
      </AddAdminModal>
      {/* ADD USER MODAL END */}
      <div className="top-box">
        <div className="create-btn">
          <Button type="primary" onClick={showModal}>
            {btnText}
          </Button>
        </div>
      </div>
    </>
  );
};
