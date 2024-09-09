import { HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import { Layout, Menu, MenuProps } from "antd";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sider from "antd/es/layout/Sider";

const { Content } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const LayoutScreen = () => {
  const navigate = useNavigate();

  function getItem(
    label: React.ReactNode,
    route: string,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem {
    return {
      icon,
      children,
      key: route,
      label,
      onClick: () => {
        if (route === "/dashboard/logout") {
          localStorage.clear();
          navigate("/login");
        } else {
          navigate(route);
        }
      },
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem("Home", "/dashboard/home", <HomeOutlined />),
    getItem("Logout", "/dashboard/logout", <LogoutOutlined />),
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <h2 style={{ color: "white" }}>Logo</h2>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: "24px 16px 0" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutScreen;
