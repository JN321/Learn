import { Menu, Layout } from "antd";
import { BrowserRouter, Link } from "react-router-dom";
import "antd/dist/antd.css";

const { Content, Sider } = Layout;

const menus = [
  {
    key: "home",
    title: "主页",
    path: "/",
    label: <Link to="/">主页</Link>,
  },
  {
    key: "app-vue1",
    title: "vue微应用1",
    path: "/app-vue1",
    label: <Link to="/app-vue1">vue微应用1</Link>,
  },
  {
    key: "app-vue2",
    title: "vue微应用2",
    path: "/app-vue2",
    label: <Link to="/app-vue2">vue微应用2</Link>,
  },
];

function App() {
  return (
    <BrowserRouter>
      <Layout hasSider>
        <Sider
          width={200}
          style={{
            height: "100vh",
          }}
          className="site-layout-background"
        >
          <Menu
            defaultSelectedKeys={["home"]}
            mode="inline"
            theme="dark"
            items={menus}
          />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <div className="App">
              <div id="container"></div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
