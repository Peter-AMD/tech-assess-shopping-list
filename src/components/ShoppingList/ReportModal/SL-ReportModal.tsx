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

const ReportCard: React.FC<ReportCard> = ({ title, cost, label }) => {
  return (
    <Card className="report-card" style={{ width: "100%" }}>
      <Flex vertical>
        <Typography.Text className="report-card__title">
          {title}
        </Typography.Text>
        <Typography.Text className="report-card__cost">
          ${cost.toFixed(2)}
        </Typography.Text>
        <Typography.Text className="report-card__label">
          {label}
        </Typography.Text>
      </Flex>
    </Card>
  );
};

const ReportModal: React.FC<ReportModalProps> = ({
  data,
  open,
  closeModal,
}) => {
  const reportCardData = mapDataToReportCard(data);
  const barData = mapDataToChartData(data);

  return (
    <Modal
      className="sl-report-modal-component"
      title="Report"
      open={open}
      onOk={closeModal}
      onCancel={closeModal}
      width="54vw"
      footer={null}
    >
      <Flex justify="space-between" gap={24} style={{ marginBottom: "24px" }}>
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
      <Typography.Text className="sl-report-modal-component__title">
        Sales Report
      </Typography.Text>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={barData}>
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(v) => `$${v}`} />
          <Tooltip />
          <Bar dataKey="value" fill="#91CAFF" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </Modal>
  );
};

export default ReportModal;
