import { Table, type TableColumnsType, type TableProps } from "antd";
import React from "react";
import type { DataType } from "../../ShoppingList";

type TableContentProps = {
  columns: TableColumnsType<DataType>;
  data: DataType[];
};

const TableContent: React.FC<TableContentProps> = ({ columns, data }) => {
  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <Table<DataType>
      virtual
      scroll={{ x: 999, y: 400 }}
      pagination={false}
      columns={columns}
      dataSource={data}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default TableContent;
