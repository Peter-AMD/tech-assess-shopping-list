import { Flex, Image, Switch, Typography } from "antd";
import logo from "@/assets/logo.png";
import { useTheme } from "@/context/theme";

const TextStyles: React.CSSProperties = {
  color: "#fff",
  height: "fit-content",
  fontWeight: 500,
  fontSize: "14px",
  lineHeight: "20px",
  letterSpacing: 0,
};

const Header: React.FC = () => {
  const { toggleTheme } = useTheme();

  return (
    <>
      <Image width={85} src={logo} />
      <Flex gap={8} align="center">
        <Typography.Text style={TextStyles}>Dark Mode</Typography.Text>
        <Switch onChange={toggleTheme} />
      </Flex>
    </>
  );
};

export default Header;
