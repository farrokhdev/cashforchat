import React, { useEffect, useState } from "react";
import DefaultTable from "../Table/DefaultTable";
import { Button, Form, message, Popconfirm, Spin, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  useFilterUsers,
  useGetUsers,
  useAddUser,
  useDeleteUser,
  useEditUser,
  useGetUser,
} from "../../hooks/useUsers";
import { TopBox } from "../Globals/TopBox";
import EditUserModal from "../modals/EditUserModal";
import { EditUserForm } from "../Forms/EditUserForm";
import { useNavigate, useParams } from "react-router";
import {
  useAddAdmin,
  useDeleteAdmin,
  useEditAdmin,
  useGetAdmin,
  useGetAdmins,
} from "../../hooks/useAdmins";
import { AdminTopBox } from "../Globals/AdminTopBox";
import EditAdminModal from "../modals/EditAdminModal";
import { EditAdminForm } from "../Forms/EditAdminForm";

export const AdminsComp = () => {
  // form validation
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  // form validation end

  // CRUD OPRATIONS
  const { adminsData, adminsLoading, adminsError, adminRefetch } =
    useGetAdmins();

  const { createAdmin, addData, addLoading, addError } = useAddAdmin();
  const { removeAdmin, deleteData, deleteLoading, deleteError } =
    useDeleteAdmin();

  const { editAdmin, editData, editLoading, editError, editRefetch } =
    useEditAdmin();
  const {
    getSingleAdmin,
    singleAdminData,
    singleAdminLoading,
    singleAdminError,
    singleRefetch,
  } = useGetAdmin();
  // CRUD OPRATIONS END

  // user ID
  const [AdminID, setAdminID] = useState(null);
  // user ID END

  // TABLE COLUMN
  const columns = [
    {
      title: "نام و نام خانوادگی",
      // dataIndex: "name",
      width: "15%",
      editable: true,
      align: "center",
      render: (_, record) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <span>{record?.username}</span>
            <span>{record?.family}</span>
          </div>
        );
      },
    },
    {
      title: "نام کاربری",
      dataIndex: "username",
      width: "15%",
      editable: true,
      align: "center",
    },
    {
      title: "شماره تماس",
      dataIndex: "phoneNumber",
      width: "15%",
      editable: true,
      align: "center",
    },
    {
      title: "تغییرات",
      dataIndex: "actions",
      width: "40%",
      align: "center",
      render: (_, record) => {
        return (
          <span
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Typography.Link onClick={() => showEditModal(record)}>
              <EditOutlined />
            </Typography.Link>

            <Typography.Link>
              <Popconfirm
                onConfirm={() => remove(record)}
                title="آیا مطمئن هستید؟"
                okText={"حذف"}
                cancelText={"انصراف"}
              >
                <DeleteOutlined />
              </Popconfirm>
            </Typography.Link>
          </span>
        );
      },
    },
  ];

  // TABLE COLUMN END

  // TABLE ACTIONS
  const remove = (record) => {
    console.log(record);
    try {
      removeAdmin({
        variables: {
          id: record._id,
        },
      }).then(() => {
        message.success("ادمین با موفقیت حذف شد");
        adminRefetch();
      });
    } catch (err) {
      console.log(err);
      message.error(
        deleteError?.message
          ? deleteError?.message
          : "حذف ادمین با مشکل مواجه شد دوباره تلاش کنید"
      );
    }
  };

  // EDIT MODAL
  const [editModal, setEditModal] = useState(false);

  // get single admin data
  const getAdmin = async (id) => {
    try {
      await getSingleAdmin({
        variables: {
          id: id,
        },
      }).then((res) => {
        console.log(res.data.getAdmin);
        setAdminID(id);
        editForm.setFieldsValue({
          ...res?.data?.getAdmin,
        });
      });
    } catch (err) {
      console.log(err);
    }
  };
  const showEditModal = (record) => {
    getAdmin(record._id);
    setEditModal(true);
  };

  const hideEditModal = () => {
    setEditModal(false);
  };

  // EDIT MODAL END

  // TABLE ACTIONS END

  return (
    <>
      {/* EDIT MODAL  */}
      <EditAdminModal
        editModal={editModal}
        showModal={showEditModal}
        hideModal={hideEditModal}
      >
        {singleAdminLoading ? (
          <>
            <Spin spinning={singleAdminLoading} />
          </>
        ) : (
          <EditAdminForm
            form={editForm}
            AdminID={AdminID}
            singleAdminData={singleAdminData}
            getSingleAdmin={getSingleAdmin}
            singleRefetch={singleRefetch}
            refetch={adminRefetch}
            update={editAdmin}
            editError={editError}
            hideEditModal={hideEditModal}
          />
        )}
      </EditAdminModal>
      {/* EDIT MODAL END */}
      <AdminTopBox
        btnText={"ایجاد ادمین جدید"}
        refetch={adminRefetch}
        createAdmin={createAdmin}
        error={addError}
      />
      <DefaultTable
        form={form}
        data={adminsData?.getAdmins}
        columns={columns}
        loading={adminsLoading}
        error={adminsError}
      />
    </>
  );
};
