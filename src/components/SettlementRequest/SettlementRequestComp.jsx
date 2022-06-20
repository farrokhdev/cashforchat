import React, { useState } from "react";
import DefaultTable from "../Table/DefaultTable";
import { Form, Typography, Popconfirm, message } from "antd";
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
} from "../../hooks/useSettlementRequests";
import CurrencyFormat from "react-currency-format";
import SettTopBox from "../Globals/SettTopBox";

export const SettlementRequestComp = () => {
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
    addSettlement,
    addSettlementError,
    addSettlementData,
    addSettlementLoading,
  } = useAddSettlement();

  const remove = async (record) => {
    try {
      await deleteSettlement({
        variables: {
          Id: record?.userId?._id,
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

  const finish = async (record) => {
    try {
      await settFinish({
        variables: {
          id: record?.userId?._id,
          input: {
            description: record?.description,
            status: record?.status,
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
      dataIndex: "username",
      width: "10%",
      align: "center",
      render: (_, record) => {
        return <>{record?.userId?.username}</>;
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
            <Typography.Link onClick={() => {}}>
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
            <Typography.Link>
              <Popconfirm
                onClick={() => {
                  console.log(record?.status);
                  finish(record);
                }}
                title="آیا مطمئن هستید؟"
                okText={"تایید"}
                cancelText={"انصراف"}
              >
                <CheckOutlined />
              </Popconfirm>
            </Typography.Link>
            <Typography.Link>
              <Popconfirm
                onClick={() => {
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

  const [form] = Form.useForm();

  return (
    <>
      <SettTopBox />
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
