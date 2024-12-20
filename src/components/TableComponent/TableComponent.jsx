import { render } from "@testing-library/react";
import { Table } from "antd";
import React from "react";
import Loading from "../LoadingComponent/Loading";


const TableComponent = (props) => {

    const {selectionType = 'checkbox',data=[], isLoading=false,columns=[]} = props
    ;
    

    const rowSelection = {
        onchange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Jim Black',
            name: record.name,
        }),
    };
  return (
    <Loading isLoading={isLoading}>
    <Table 
    rowSelection={{
        type: selectionType,
        ...rowSelection,
    }}
    columns={columns}
    dataSource={data}
    />
</Loading>
  );
};

export default TableComponent;
