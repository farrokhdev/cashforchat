import React from "react";
import { Form } from "antd";
import DefaultTable from "../Table/DefaultTable";
import { useGetCallLog, useListCallLogs } from "../../hooks/useUserCalls";

const UserCallsComp = () => {
  const [form] = Form.useForm();

  const { callsData, callsError, callsLoading, refetch } = useListCallLogs();
  const { singleCallData, singleCallError, singleCallLoading } =
    useGetCallLog();

  const callsList = callsData?.listCallLogs;

  const columns = [
    {
      title: "وضعیت ",
      dataIndex: "status",
      width: "40%",
      editable: true,
      align: "center",
    },
    {
      title: "تماس گیرنده ",
      dataIndex: "caller",
      width: "40%",
      editable: true,
      align: "center",
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
