import { Flex, type TableColumnsType } from "antd";
import React from "react";
import TableFilter, { type FilterParam } from "./Filter/SL-TableFilter";
import TableContent from "./Content/SL-TableContent";
import type { DataType } from "../ShoppingList";

type TableProps = {
  setColumnsHandler: (f: FilterParam) => void;
  categories: unknown[];
  subcategories: unknown[];
  stateColumns: TableColumnsType<DataType>;
  data: DataType[];
  filteredData: DataType[];
};
const Table: React.FC<TableProps> = ({
  setColumnsHandler,
  categories,
  subcategories,
  stateColumns,
  data,
  filteredData,
}) => {
  return (
    <Flex vertical>
      <TableFilter
        filteredData={filteredData}
        filterHandler={setColumnsHandler}
        categories={categories}
        subcategories={subcategories}
      />
      <TableContent columns={stateColumns} data={data} />
    </Flex>
  );
};

export default Table;
