import { Card, Flex, Modal, Typography } from "antd";
import type React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { DataType } from "../ShoppingList";
import { mapDataToChartData, mapDataToReportCard } from "../Table/utils/map";

type ReportModalProps = {
  data: DataType[];
  open: boolean;
  closeModal: () => void;
};

type ReportCard = {
  title: string;
  cost: number;
  label: string;
};
const dataMock = [
  // name = name value = total
  { name: "A", value: 30 },
  { name: "B", value: 80 },
  { name: "C", value: 45 },
  { name: "D", value: 60 },
  { name: "E", value: 20 },
];

const ReportCard: React.FC<ReportCard> = ({ title, cost, label }) => {
  return (
    <Card style={{ width: "24%" }}>
      <Flex vertical>
        <Typography.Text>{title}</Typography.Text>
        <Typography.Text>${cost.toFixed(2)}</Typography.Text>
        <Typography.Text>{label}</Typography.Text>
      </Flex>
    </Card>
  );
};

const ReportModal: React.FC<ReportModalProps> = ({
  data,
  open,
  closeModal,
}) => {
  const barData = mapDataToChartData(data);
  const reportCardData = mapDataToReportCard(data);

  console.log("data", data);
  return (
    <Modal
      title="Report"
      open={open}
      onOk={closeModal}
      onCancel={closeModal}
      width="90vw"
    >
      <Flex justify="space-between">
        {reportCardData?.map((r) => {
          return (
            <ReportCard
              key={r.title}
              title={r.title}
              cost={r.cost}
              label={r.label}
            />
          );
        })}
      </Flex>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Modal>
  );
};

export default ReportModal;
