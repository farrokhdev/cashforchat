import React, { useEffect } from "react";
import { Form, Table, message } from "antd";
import '../../assets/styles/settRowClass.scss';

const DefaultTable = ({
  form = "",
  data = "",
  columns = "",
  loading = "",
  error = "",
  footer = ""
}) => {

  useEffect(() => {
    if (error) {
      message.error(error?.message);
    }
  },[error])

  const rowColor = record => {
    if(record?.status == 1){
      return 'table-row-one'
    } else if (record?.status == 2){
      return 'table-row-two'
    } else if (record?.status == 3){
      return 'table-row-three'
    }
  }

  return (
    <Form form={form} component={false}>
      <Table
        pagination={
          {
            position: ["bottomRight"],
            showSizeChanger: true,
            showPrevNextJumpers: true ,
            locale: {items_per_page: "صفحه"},
            defaultPageSize: 5,
            pageSizeOptions: [5, 10, 15],
            itemRender: (_,type, originalElement) => {
              if(type === "prev"){
                return <a style={{'fontFamily': 'iranyekan'}}>قبلی</a>
              }
              if(type === "next"){
                return <a style={{'fontFamily': 'iranyekan'}}>بعدی</a>
              }
              return originalElement
            }
          }}
        className="custom-table"
        locale={{
          emptyText: "دیتایی موجود نیست",
        }}
        bordered
        dataSource={data}
        columns={columns}
        loading={loading}
        footer={footer}
        rowClassName={ record => rowColor(record) }
      />
    </Form>
  );
};

export default DefaultTable;
