import React, { useState } from "react";
import DefaultTable from "../Table/DefaultTable";
import { Form, Typography, Popconfirm, message, Spin } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import {
  useSettlementRequests,
  useDeleteSett,
  useFinish,
  useEditRequest,
  useAddSettlement,
  useSingleRequest,
} from "../../hooks/useSettlementRequests";
import CurrencyFormat from "react-currency-format";
import SettTopBox from "../Globals/SettTopBox";
import EditRequestModal from "../modals/EditRequestModal";
import EditRequestForm from "../Forms/EditRequestForm";
import { useEffect } from "react";
import { useGetUsers } from "../../hooks/useUsers";

export const SettlementRequestComp = () => {
  // form validation
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  // form validation end

  const { getUsers, usersData, usersLoading, usersError, refetch } =
    useGetUsers();

  const getAllUsers = async () => {
    await getUsers();
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  const { settError, settData, settLoading, settRefetch } =
    useSettlementRequests();
  const {
    deleteSettlement,
    deleteSettData,
    deleteSettError,
    deleteSettLoading,
  } = useDeleteSett();
  const { settFinish, finishLoading, finishData, finishError } = useFinish();
  const { editRequest, editRequestData, editRequestError, editRequestLoading } =
    useEditRequest();
  const {
    addNewSettlement,
    addSettlementError,
    addSettlementData,
    addSettlementLoading,
  } = useAddSettlement();
  const {
    singleRequest,
    singleRequestData,
    singleRequestError,
    singleRequestLoading,
  } = useSingleRequest();

  const [requestID, setRequestID] = useState(null);
  const [status, setStatus] = useState(null);

  //Edit
  const [editModal, setEditModal] = useState(false);

  // get single
  const singleSettleMent = async (id) => {
    try {
      await singleRequest({
        variables: {
          id: id,
        },
      }).then((res) => {
        setRequestID(id);
        editForm.setFieldsValue({
          ...res.data.getSettlementRequest,
        });
      });
    } catch (err) {
      console.log(err);
    }
  };
  const showEditModal = (record) => {
    singleSettleMent(record?._id);
    setEditModal(true);
  };

  const hideEditModal = () => {
    setEditModal(false);
  };

  useEffect(() => {
    try {
      singleRequest({
        variables: {
          id: requestID,
        },
      }).then(() => {});
    } catch (err) {
      console.log(err);
    }
  }, [requestID]);
  console.log(singleRequestData);
  //Delete
  const remove = async (record) => {
    try {
      await deleteSettlement({
        variables: {
          id: record?.userId?._id,
        },
      }).then(() => {
        message.success("درخواست حذف شد");
        settRefetch();
      });
    } catch (err) {
      console.log(err);
      await message.error(
        deleteSettError?.message
          ? deleteSettError?.message
          : "حذف درخواست با مشکل مواجه شد دوباره تلاش کنید"
      );
    }
  };

  //Finish
  const finish = async (record) => {
    console.log(status);
    try {
      await settFinish({
        variables: {
          id: record?.userId?._id,
          input: {
            description: record?.description,
            status: status,
          },
        },
      }).then(() => {
        message.success("درخواست تایید شد");
        settRefetch();
      });
    } catch (err) {
      await message.error(
        finishError?.message
          ? finishError?.message
          : "تایید درخواست با مشکل مواجه شد دوباره تلاش کنید"
      );
    }
  };

  const columns = [
    {
      title: "نام کاربری",
      dataIndex: "fullName",
      width: "10%",
      align: "center",
      render: (_, record) => {
        return <>{record?.userId?.fullName}</>;
      },
    },
    {
      title: "مبلغ",
      dataIndex: "amount",
      width: "10%",
      align: "center",
      render: (_, record) => {
        return (
          <CurrencyFormat
            value={record?.amount}
            thousandSeparator={true}
            suffix={"R"}
            displayType={"text"}
          />
        );
      },
    },
    {
      title: "شماره شبا",
      dataIndex: "shebaNo",
      width: "15%",
      align: "center",
      render: (_, record) => {
        return <>{record?.shebaNo}</>;
      },
    },
    {
      title: "شماره کارت",
      dataIndex: "creditCardNo",
      width: "15%",
      align: "center",
      render: (_, record) => {
        return <>{record?.creditCardNo}</>;
      },
    },
    {
      title: "توضیحات ",
      dataIndex: "description",
      width: "20%",
      align: "center",
      render: (_, record) => {
        return <>{record?.description}</>;
      },
    },
    {
      title: "تغییرات",
      dataIndex: "actions",
      width: "15%",
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
            <Typography.Link
              onClick={() => {
                showEditModal(record);
              }}
            >
              <EditOutlined />
            </Typography.Link>
            <Typography.Link>
              <Popconfirm
                onConfirm={() => {
                  remove(record);
                }}
                title="آیا مطمئن هستید؟"
                okText={"حذف"}
                cancelText={"انصراف"}
              >
                <DeleteOutlined />
              </Popconfirm>
            </Typography.Link>
            <Typography.Link
              onClick={() => {
                setStatus(2);
              }}
            >
              <Popconfirm
                onConfirm={() => {
                  finish(record);
                }}
                title="آیا مطمئن هستید؟"
                okText={"تایید"}
                cancelText={"انصراف"}
              >
                <CheckOutlined />
              </Popconfirm>
            </Typography.Link>
            <Typography.Link
              onClick={() => {
                setStatus(3);
              }}
            >
              <Popconfirm
                onConfirm={() => {
                  finish(record);
                }}
                title="آیا مطمئن هستید؟"
                okText={"رد"}
                cancelText={"انصراف"}
              >
                <CloseOutlined />
              </Popconfirm>
            </Typography.Link>
          </span>
        );
      },
    },
  ];

  return (
    <>
      <EditRequestModal hideModal={hideEditModal} editModal={editModal}>
        {singleRequestLoading ? (
          <>
            <Spin spinning={singleRequestLoading} />
          </>
        ) : (
          <EditRequestForm
            form={editForm}
            requestID={requestID}
            users={usersData?.getUsers}
            loading={usersLoading}
            editRequest={editRequest}
            editRequestError={editRequestError}
            hideEditModal={hideEditModal}
            settRefetch={settRefetch}
          />
        )}
      </EditRequestModal>
      <SettTopBox
        users={usersData?.getUsers}
        usersLoading={usersLoading}
        addRequest={addNewSettlement}
        refetch={settRefetch}
      />
      <DefaultTable
        form={form}
        data={settData?.getSettlementRequests}
        columns={columns}
        loading={settLoading}
        error={settError}
      />
    </>
  );
};
