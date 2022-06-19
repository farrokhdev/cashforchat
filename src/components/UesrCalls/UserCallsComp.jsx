import React from "react";
import { Form, Tag } from "antd";
import DefaultTable from "../Table/DefaultTable";
import { useListCallLogs } from "../../hooks/useUserCalls";

const UserCallsComp = () => {
  const [form] = Form.useForm();

  const { callsData, callsError, callsLoading, refetch } = useListCallLogs();

  const callsList = callsData?.listCallLogs;

  const status = (record) => {
    if(record?.step === 1){
      return (<Tag color={"blue"}>start</Tag>)
    }
    else if(record?.step === 2){
      return (<Tag color={"lime"}>answer</Tag>)
    }
    else if(record?.step === 3){
      return (<Tag color={"purple"}>reject</Tag>)
    }
    else if(record?.step === 9){
      return (<Tag color={"red"}>missed</Tag>)
    }
    else if(record?.step === 10){
      return (<Tag color={"green"}>end</Tag>)
    }
  }

  const columns = [
    {
      title: " نام کامل  ",
      dataIndex: "fullName",
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
            {record?.user?.fullName}
          </span>
        );
      },
    },
    {
      title: "وضعیت ",
      dataIndex: "step",
      width: "20%",
      editable: true,
      align: "center",
      render: (_,record) => {
        return(
          <span>
            {status(record)}
          </span>
        )
      }
    },
    {
      title: "مخاطب ",
      dataIndex: "status",
      width: "20%",
      editable: true,
      align: "center",
      render: (_,record) => {
        return(
          <span>
            {record?.provider?.fullName}
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
    {
      title: "رزرو شده ",
      dataIndex: "isReserved",
      width: "20%",
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
