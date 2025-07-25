import { BarChartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Flex, Space, Typography } from "antd";
import React from "react";
import type { DataType } from "../ShoppingList";

const ReportModal = React.lazy(() => import("../ReportModal/SL-ReportModal"));

type HeaderProps = {
  data: DataType[];
};

const Header: React.FC<HeaderProps> = ({ data }) => {
  const [open, setOpen] = React.useState(false);

  const closeModal = () => {
    setOpen(false);
  };
  const openModal = () => {
    setOpen(true);
  };
  return (
    <Flex justify="space-between" align="center" style={{ height: "16px" }}>
      <Space>
        <ShoppingCartOutlined style={{ fontSize: 24, color: "#667085" }} />
        <Typography.Text style={{ fontWeight: 600, fontSize: 20 }}>
          Shopping List Application
        </Typography.Text>
      </Space>
      <ReportModal open={open} closeModal={closeModal} data={data} />
      <Button type="primary" icon={<BarChartOutlined />} onClick={openModal}>
        View Report
      </Button>
    </Flex>
  );
};

export default Header;
