import React from "react";
import { Form, Tag } from "antd";
import DefaultTable from "../Table/DefaultTable";
import { useListCallLogs } from "../../hooks/useUserCalls";

const UserCallsComp = () => {
  const [form] = Form.useForm();

  const { callsData, callsError, callsLoading, refetch } = useListCallLogs();

  const callsList = callsData?.listCallLogs;

  const columns = [
    {
      title: " نام کاربری  ",
      dataIndex: "username",
      width: "20%",
      editable: true,
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
            {record?.user?.username}
          </span>
        );
      },
    },
    {
      title: "وضعیت ",
      dataIndex: "status",
      width: "20%",
      editable: true,
      align: "center",
      render: (_,record) => {
        return(
          <span>
            {record?.status == "Missed" ? 
            <Tag color={"red"}>Missed</Tag> :
            <Tag color={"green"}>Incoming</Tag>}
          </span>
        )
      }
    },
    {
      title: "مقدار بلاک شده ",
      dataIndex: "amountBlocked",
      width: "20%",
      editable: true,
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
            {record?.user?.amountBlocked}
          </span>
        );
      },
    },
    // {
    //   title: "تماس گیرنده ",
    //   dataIndex: "caller",
    //   width: "40%",
    //   editable: true,
    //   align: "center",
    // },
    {
      title: "رزرو شده ",
      dataIndex: "isReserved",
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
            {record?.isReserved ? "بله" : "خیر"}
          </span>
        );
      },
    },
  ];

  return (
    <DefaultTable
      form={form}
      data={callsList}
      loading={callsLoading}
      error={callsError}
      columns={columns}
    />
  );
};

export default UserCallsComp;
