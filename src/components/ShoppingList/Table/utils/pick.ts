import type { mockInventoryType } from "../../ShoppingList";


export const collectFieldValues = (field: keyof mockInventoryType) => {
  return (list: mockInventoryType[]) => {
    const uniqueItems: unknown[] = [];

    list.forEach((item: mockInventoryType) => {
      const value = item[field];
      if (uniqueItems.includes(value)) {
        return;
      } else {
        uniqueItems.push(value);
      }
    });

    return uniqueItems;
  };
};
const Pick = {
  collectFieldValues,
};
export default Pick;
