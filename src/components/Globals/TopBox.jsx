import React, { useEffect, useState } from "react";
import { Button, Input, Dropdown, Menu, Space, message } from "antd";
import AddUserModal from "../modals/AddUserModal";
import { AddUserForm } from "../Forms/AddUserForm";

const { Search } = Input;

export const TopBox = ({
  searchText,
  btnText,
  filterUsers = "",
  refetch = "",
  error = "",
  createUser = "",
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

  const onSearch = (value) => {
    try {
      filterUsers({ variables: { filters: { fullName: value } } }).then(() =>
        refetch()
      );
    } catch (err) {
      if (error) {
        message.error(error ? error.message : "error");
      }
    }
  };

  const addUser = (values) => {
    try {
      createUser({
        variables: {
          username: values.username,
          fullName: values.fullName,
          phoneNumber: values.phoneNumber,
        },
      }).then(() => {
        message.success("کاربر با موفقیت ساخته شد");
        hideModal();
        refetch();
      });
    } catch (err) {
      console.log(err);
      message.error(error.message);
    }
  };
  return (
    <>
      {/* ADD USER MODAL */}
      <AddUserModal addModal={addModal} hideModal={hideModal}>
        <AddUserForm onFinish={addUser} />
      </AddUserModal>
      {/* ADD USER MODAL END */}
      <div className="top-box">
        <div className="search">
          <Search placeholder={searchText} onSearch={onSearch} enterButton />
        </div>
        <div className="create-btn">
          <Button type="primary" onClick={showModal}>
            {btnText}
          </Button>
        </div>
      </div>
    </>
  );
};
