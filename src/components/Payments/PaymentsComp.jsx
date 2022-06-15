import React from "react";
import DefaultTable from "../Table/DefaultTable";
import { useGetPayments } from "../../hooks/usePayments";
import { Form } from "antd";




const PaymentsComp = () => {
  const [form] = Form.useForm();

  const { paymentsError, paymentsData, paymentsLoading, refetch } =
    useGetPayments();
  

  const paymentList = paymentsData?.getPayments;

  const columns = [
    {
      title: "نام کاربری ",
      dataIndex: "username",
      width: "20%",
      editable: true,
      align: "center",
      render: (_,record) => {
        return (
          <span>
            {record?.userId?.username}
          </span>
        )}
    },
    {
      title: "نام کامل ",
      dataIndex: "fullName",
      width: "20%",
      editable: true,
      align: "center",
      render: (_,record) => {
        return (
          <span>
            {record?.userId?.fullName}
          </span>
        )}
    },
    {
      title: "وضعیت ",
      dataIndex: "status",
      width: "20%",
      editable: true,
      align: "center",
    },
    {
      title: " مقدار",
      dataIndex: "amount",
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
  ];

  return (
    <DefaultTable
      form={form}
      data={paymentList}
      error={paymentsError}
      loading={paymentsLoading}
      columns={columns}
    />
  );
};

export default PaymentsComp;
