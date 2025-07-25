import { Divider, Flex, Space, Tag, type TableColumnsType } from "antd";
import React from "react";
import Header from "./Header/SL-Header";
import AddItem, { type FormFields } from "./AddItem/SL-AddItem";
import Table from "./Table/SL-Table";
import { collectFieldValues } from "./Table/utils/pick";
import mockInventory from "@/services/mock-data.json";
import type { FilterParam } from "./Table/Filter/SL-TableFilter";
import {
  categoryFilter,
  getFilteredData,
  nameFilter,
  subcategoryFilter,
} from "./Table/utils/filter";
import { mapMockData } from "./Table/utils/map";

export interface DataType {
  key: React.Key;
  name: string;
  category: string;
  subcategory: string;
  qty: number;
  price: number;
  total: number;
  date: string;
  status?: string;
}

export type mockInventoryType = Omit<DataType, "key" | "total">;
const columns: TableColumnsType<DataType> = [
  {
    title: "Item Name",
    dataIndex: "name",
    filteredValue: [],
    onFilter: nameFilter,
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (value, record) => {
      return (
        <Space>
          <strong style={{ fontSize: "16px" }}>{value}</strong>
          {record.status ? <Tag color="blue">{record.status}</Tag> : null}
        </Space>
      );
    },
  },
  {
    title: "Category",
    dataIndex: "category",
    filteredValue: [],
    onFilter: categoryFilter,
    sorter: (a, b) => a.category.localeCompare(b.category),
  },
  {
    title: "Sub Category",
    dataIndex: "subcategory",
    filteredValue: [],
    onFilter: subcategoryFilter,
    sorter: (a, b) => a.subcategory.localeCompare(b.subcategory),
  },
  {
    title: "Quantity",
    dataIndex: "qty",
    sorter: (a, b) => a.qty - b.qty,
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Total",
    dataIndex: "total",
    sorter: (a, b) => a.total - b.total,
  },
  {
    title: "Date",
    dataIndex: "date",
    filteredValue: [],
    onFilter: (value, record) => record.date.indexOf(value as string) === 0,
    sorter: (a, b) => a.date.length - b.date.length,
  },
];

const getCategories = collectFieldValues("category");
const getSubcategories = collectFieldValues("subcategory");

const categories = getCategories(mockInventory);
const subcategories = getSubcategories(mockInventory);
export type CategoriesType = typeof categories;
export type SubcategoriesType = typeof subcategories;
const data: DataType[] = mapMockData(mockInventory);

const ShoppingList: React.FC = () => {
  const [stateColumns, setStateColumns] =
    React.useState<TableColumnsType<DataType>>(columns);
  const [stateData, setStateData] = React.useState<DataType[]>(data);
  const filteredData = getFilteredData(stateColumns, stateData);

  const setColumnsHandler = (filter: FilterParam) => {
    const [filterKey, filterValue] = Object.entries(filter)[0];

    setStateColumns((c) => {
      const arr = c.map((col) => {
        // @ts-expect-error Need to check correct type
        if (col.dataIndex === filterKey) {
          return {
            ...col,
            filteredValue: [filterValue],
          };
        } else {
          return col;
        }
      });
      return arr;
    });
  };

  const addShoppingItem = (item: FormFields) => {
    setStateData((d) => {
      return [
        {
          ...item,
          key: d.length,
          total: Number((item.qty * item.price || 0).toFixed(2)),
          date: item.date.format("DD MMM YYYY"),
          status: "New",
        },
        ...d,
      ];
    });
  };

  return (
    <Flex vertical>
      <Header data={stateData} />
      <Divider />
      <AddItem
        addShoppingItem={addShoppingItem}
        categories={categories}
        subcategories={subcategories}
      />
      <Divider />
      <Table
        data={stateData}
        filteredData={filteredData}
        stateColumns={stateColumns}
        setColumnsHandler={setColumnsHandler}
        categories={categories}
        subcategories={subcategories}
      />
    </Flex>
  );
};

export default ShoppingList;
