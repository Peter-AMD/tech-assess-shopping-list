import { BarChartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Flex, Space, Typography } from "antd";
import React from "react";
import type { DataType } from "../ShoppingList";
import ShoppingCartIcon from "@/assets/icons/shopping-cart";
import ReportBarIcon from "@/assets/icons/report-bar";

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
    <Flex
      justify="space-between"
      align="center"
      style={{
        height: "64px",
        padding: "20px 24px",
        backgroundColor: "var(--ant-color-bg-base)",
      }}
    >
      <Space style={{ gap: "12px" }}>
        <ShoppingCartIcon />
        <Typography.Text
          className="shopping-list-header__title"
          style={{
            fontWeight: 600,
            fontSize: 20,
            position: "relative",
            bottom: "5px",
          }}
        >
          Shopping List Application
        </Typography.Text>
      </Space>
      <ReportModal open={open} closeModal={closeModal} data={data} />
      <Button
        type="default"
        icon={<ReportBarIcon />}
        onClick={openModal}
        style={{ fontWeight: "bold", color: "rgba(0,0,0, .88)" }}
      >
        <span className="lato-font-family">View Report</span>
      </Button>
    </Flex>
  );
};

export default Header;
