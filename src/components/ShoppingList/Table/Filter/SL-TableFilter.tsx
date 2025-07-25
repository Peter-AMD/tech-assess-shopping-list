import { Button, Flex, Form, Input, Select, Space, Typography } from "antd";
import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { BaseOptionType } from "antd/es/select";
import { mkConfig, generateCsv, download } from "export-to-csv";

import type { CategoriesType, DataType, SubcategoriesType } from "../../ShoppingList";

const csvConfig = mkConfig({ useKeysAsHeaders: true });

export type FilterParam =
  | { category: string }
  | { subcategory: string }
  | { search: string };

type TableFilterProps = {
  // data: DataType[];
  filteredData: DataType[];
  categories: CategoriesType;
  subcategories: SubcategoriesType;
  filterHandler: (a: FilterParam) => void;
};

const withEmptyOption = (opt: BaseOptionType[]) => {
  return [
    {
      value: "",
      label: "None",
    },
    ...opt,
  ];
};
const TableFilter: React.FC<TableFilterProps> = ({
  filteredData,
  categories,
  subcategories,
  filterHandler,
}) => {
  const [form] = Form.useForm();
  const optionsCategories = withEmptyOption(
    categories.map((c) => ({ value: c, label: c }))
  );
  const optionsSubcategories = withEmptyOption(
    subcategories.map((c) => ({
      value: c,
      label: c,
    }))
  );
  const dataCount = (filteredData?.length) || 0;
  const onChangeFilters = (filter: FilterParam) => {
    filterHandler(filter);
  };

  const handleGenerateCSV = () => {
    // @ts-expect-error need to assert accepted data
    const csv = generateCsv(csvConfig)(filteredData);

    download(csvConfig)(csv);
  };

  return (
    <Flex
      justify="space-between"
      align="center"
      style={{ maxHeight: "72px", height: "100%" }}
    >
      <Typography.Title level={4}>{dataCount} Items</Typography.Title>
      <Space>
        <Typography.Text>Filter By</Typography.Text>
        <Form layout="inline" form={form} onValuesChange={onChangeFilters}>
          <Form.Item name="category">
            <Select
              placeholder="Select Category"
              style={{ width: 120 }}
              options={optionsCategories}
            />
          </Form.Item>
          <Form.Item name="subcategory">
            <Select
              placeholder="Select Sub Category"
              style={{ width: 120 }}
              options={optionsSubcategories}
            />
          </Form.Item>
          <Form.Item name="name">
            <Input placeholder="Search" prefix={<SearchOutlined />} />
          </Form.Item>
        </Form>
        <Button type="primary" onClick={handleGenerateCSV}>
          Export Data
        </Button>
      </Space>
    </Flex>
  );
};

export default TableFilter;
