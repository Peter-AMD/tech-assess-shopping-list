import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  type FormItemProps,
} from "antd";
import type { BaseOptionType } from "antd/es/select";
import dayjs from "dayjs";

export type FormFields = {
  category: string;
  date: dayjs.Dayjs;
  name: string;
  price: number;
  qty: number;
  subcategory: string;
};

type AddItemProps = {
  addShoppingItem: (i: FormFields) => void;
  categories: unknown[];
  subcategories: unknown[];
};

const { Option } = Select;
const itemCommonProps: FormItemProps = {
  labelAlign: "left",
  layout: "vertical",
};

const selectAfter = (
  <Select defaultValue="USD" style={{ width: 60 }}>
    <Option value="USD">$</Option>
    <Option value="EUR">€</Option>
    <Option value="GBP">£</Option>
    <Option value="CNY">¥</Option>
  </Select>
);

const withDisableSelect = (options: BaseOptionType[]) => {
  return [
    {
      value: "",
      label: "Select",
      disabled: true,
    },
    ...options,
  ];
};
const AddItem: React.FC<AddItemProps> = ({
  addShoppingItem,
  categories,
  subcategories,
}) => {
  const [form] = Form.useForm<FormFields>();
  const optionsCategories = withDisableSelect(
    categories.map((c) => ({ value: c, label: c }))
  );
  const optionsSubcategories = withDisableSelect(
    subcategories.map((c) => ({
      value: c,
      label: c,
    }))
  );

  const submitForm = async () => {
    try {
      const values = await form.validateFields();
      if (!values.date) {
        addShoppingItem({ ...values, date: dayjs() });
      } else {
        addShoppingItem(values);
      }
    } catch (error) {
      console.log("Validation failed", error);
    }
  };

  return (
    <Form layout="inline" form={form}>
      <Form.Item {...itemCommonProps} label="Add New Item" name="name">
        <Input placeholder="Enter Item Name" />
      </Form.Item>
      <Form.Item {...itemCommonProps} label="Category" name="category">
        <Select
          defaultValue=""
          style={{ width: 120 }}
          options={optionsCategories}
        />
      </Form.Item>
      <Form.Item {...itemCommonProps} label="Sub Category" name="subcategory">
        <Select
          defaultValue=""
          style={{ width: 120 }}
          options={optionsSubcategories}
        />
      </Form.Item>
      <Form.Item {...itemCommonProps} label="Quantity" name="qty">
        <InputNumber min={0} max={999} defaultValue={0} />
      </Form.Item>
      <Form.Item {...itemCommonProps} label="Price" name="price">
        <InputNumber addonAfter={selectAfter} defaultValue={0} />
      </Form.Item>
      <Form.Item {...itemCommonProps} label="Date" name="date">
        <DatePicker
          defaultValue={dayjs()}
          format={{
            format: "DD MMM YYYY",
            type: "mask",
          }}
        />
      </Form.Item>
      <Form.Item style={{ display: "flex", alignItems: "flex-end" }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={submitForm}>
          Add Item
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddItem;
