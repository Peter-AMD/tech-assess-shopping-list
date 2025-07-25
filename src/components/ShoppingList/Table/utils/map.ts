import type { DataType, mockInventoryType } from "../../ShoppingList";

export const mapMockData = (data: mockInventoryType[]): DataType[] => {
  return (data || []).map((d, idx) => {
    return {
      ...d,
      key: idx,
      total: Number((d.qty * d.price || 0).toFixed(2)),
    };
  });
};

export const mapDataToChartData = (data: DataType[]) => {
  const mapped = data.map((d) => {
    return {
      name: d.name,
      value: d.total,
    };
  });

  return mapped;
};

export const mapDataToReportCard = (data: DataType[]) => {
  let highestCostItem = { total: 0, name: "", qty: 0 };
  const totalSpending = data.reduce((accum, current) => {
    // get highest while we are looping
    if (current.total > highestCostItem.total) {
      highestCostItem = {
        total: current.total,
        name: current.name,
        qty: current.qty,
      };
    }
    return accum + current.total;
  }, 0);
  const averageCost = totalSpending / data.length;

  return [
    {
      title: "Total Spending",
      cost: totalSpending,
      label: `${data.length} Items in total`,
    },
    {
      title: "Highest Cost Item",
      cost: highestCostItem.total,
      label: `${highestCostItem.name} (${highestCostItem.qty} Unit)`,
    },
    {
      title: "Average Cost",
      cost: averageCost,
      label: "Per Item",
    },
  ];
};

const MapUtil = {
  mapMockData,
  mapDataToChartData,
  mapDataToReportCard,
};
export default MapUtil;
