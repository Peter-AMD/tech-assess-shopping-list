import type { TableColumnsType } from "antd";
import type { DataType } from "../../ShoppingList";

type FilterType = (value: boolean | React.Key, record: DataType) => boolean;
type FilterDataFunc = (
  c: TableColumnsType<DataType>,
  d: DataType[]
) => DataType[];

export const nameFilter: FilterType = (value, record) => {
  return (
    record.name
      .toLowerCase()
      .indexOf(((value || "") as string).toLowerCase()) !== -1
  );
};

export const categoryFilter: FilterType = (value, record) =>
  record.category.indexOf(value as string) === 0;

export const subcategoryFilter: FilterType = (value, record) =>
  record.subcategory.indexOf(value as string) === 0;

export const getFilteredData: FilterDataFunc = (col, data) => {
  const filters = col
    .map((c) => {
      if (c.filteredValue?.length) {
        return {
          // @ts-expect-error check data type
          key: c.dataIndex,
          string: c.filteredValue[0],
        };
      } else {
        return null;
      }
    })
    .filter((f) => f);

  const nameValue = filters.find((v) => v?.key === "name")?.string || "";
  const categoryValue =
    filters.find((v) => v?.key === "category")?.string || "";
  const subcategoryValue =
    filters.find((v) => v?.key === "subcategory")?.string || "";

  const filtered = data.filter((d) => {
    const nameCheck = nameFilter(nameValue, d);
    const categoryCheck = categoryFilter(categoryValue, d);
    const subcategoryCheck = subcategoryFilter(subcategoryValue, d);

    return nameCheck && categoryCheck && subcategoryCheck;
  });

  return filtered;
};

const Filter = {
  nameFilter,
  categoryFilter,
  subcategoryFilter,
  getFilteredData,
};

export default Filter;
