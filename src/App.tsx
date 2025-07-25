import HeaderComponent from "./components/layout/Header/Header";
import { Flex, Layout } from "antd";
import ShoppingList from "./components/ShoppingList/ShoppingList";

const { Header, Content, Footer } = Layout;

const layoutStyle: React.CSSProperties = {
  overflow: "hidden",
  width: "100%",
  height: "100%",
};
const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: "13px 24px",
  lineHeight: "64px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
};
const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  padding: 24,
};
const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
};

const App = () => {
  return (
    <Flex gap="middle" wrap>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <HeaderComponent />
        </Header>
        <Content style={contentStyle}>
          <ShoppingList />
        </Content>
        <Footer style={footerStyle} />
      </Layout>
    </Flex>
  );
};

export default App;
