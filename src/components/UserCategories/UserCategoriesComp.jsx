import React, { useEffect, useState } from "react";
import DefaultTable from "../Table/DefaultTable";
import { Button, Form, message, Popconfirm, Spin, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { UserCatTopBox } from "../Globals/UserCatTopBox";
import {
  useAddUserCat,
  useDeleteUserCat,
  useEditUserCat,
  useGetUserCat,
  useGetUserCats,
} from "../../hooks/useUserCategories";
import EditUserCatModal from "../modals/EditUserCatModal";
import { EditUserCatForm } from "../Forms/EditUserCatForm";

export const UserCategoriesComp = () => {
  // CRUD OPRATIONS
  const { userCatsData, userCatsLoading, userCatsError, refetch } =
    useGetUserCats();

  const { createUserCat, addData, addLoading, addError } = useAddUserCat();
  const { removeUserCat, deleteData, deleteLoading, deleteError } =
    useDeleteUserCat();

  const { updateUserCat, editData, editLoading, editError, editRefetch } =
    useEditUserCat();

  const {getSingleUserCat, singleUserCatData, singleUserCatError, singleUserCatLoading, singleCatRefetch} = 
    useGetUserCat()

  // CRUD OPRATIONS END

  // user ID
  const [userCatID, setUserCatID] = useState(null);
  // user ID END


  // TABLE COLUMN
  const columns = [
    {
      title: "عنوان ",
      dataIndex: "title",
      width: "20%",
      editable: true,
      align: "center",
    },
    {
      title: "کلید واژه",
      dataIndex: "key",
      width: "20%",
      editable: true,
      align: "center",
    },
    {
      title: "توضیحات",
      dataIndex: "description",
      width: "20%",
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
    try {
      removeUserCat({
        variables: {
          id: record._id,
        },
      }).then(() => {
        message.success("دسته بندی با موفقیت حذف شد");
        refetch();
      });
    } catch (err) {
      console.log(err);
      message.error(
        deleteError?.message ? deleteError?.message : "حذف با خطا مواجه شد"
      );
    }
  };

  // EDIT MODAL
  const [editModal, setEditModal] = useState(false);
  const showEditModal = (record) => {
    setEditModal(true);
    setUserCatID(record._id); 
    
    };

  useEffect(() => {
    try {
       getSingleUserCat({
       variables: {
         id: userCatID,
       },
     }).then(() => {});
   } catch (err) {
     console.log(err);
   }

}, [userCatID]);
  
  const hideEditModal = () => {
    setEditModal(false);
    // setUserCatID(null);
  };

  // EDIT MODAL END

  // TABLE ACTIONS END

  // form validation
  const [form] = Form.useForm();
  // form validation end


  return (
    <>
      {/* EDIT MODAL  */}
      <EditUserCatModal 
        visible={editModal} 
        closeModal={hideEditModal} 
        showModal={showEditModal}
        >
        {singleUserCatLoading ? (
          <>
            <Spin spinning={singleUserCatLoading} />
          </>
        ) : (
          <EditUserCatForm
            singleUserCatData={singleUserCatData}
            singleCatRefetch={singleCatRefetch}
            getSingleUserCat={getSingleUserCat}
            update={updateUserCat}
            refetch={refetch}
            userCatID={userCatID}
            editError={editError}
            hideEditModal={hideEditModal}
          />
        )}
      </EditUserCatModal>
      
      {/* EDIT MODAL END */}
      <UserCatTopBox
        btnText={"ایجاد دسته بندی جدید"}
        refetch={refetch}
        createUserCat={createUserCat}
      />
      <DefaultTable
        form={form}
        data={userCatsData?.getUserCategories}
        columns={columns}
        loading={userCatsLoading}
        error={userCatsError}
      />
    </>
  );
};
