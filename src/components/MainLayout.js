import LeftMenu from "../pages/Admin/components/LeftMenu";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, theme } from "antd";
import React, { useState } from "react";

const { Header, Sider, Content } = Layout;

const MainLayout = ({ children }) => {
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	return (
		<Layout className="min-h-screen">
			<Sider
				className="fixed top-0 left-0 bottom-0"
				trigger={null}
				collapsible
				collapsed={collapsed}
			>
				<div className="logo" />
				<LeftMenu />
			</Sider>
			<Layout className="site-layout">
				<Header
					style={{
						padding: 0,
						background: colorBgContainer,
					}}
				>
					{React.createElement(
						collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
						{
							className: "trigger ml-4",
							onClick: () => setCollapsed(!collapsed),
						}
					)}
				</Header>
				<Content
					style={{
						margin: "24px 16px",
						padding: 24,
						minHeight: 280,
						background: colorBgContainer,
					}}
				>
					{children}
				</Content>
			</Layout>
		</Layout>
	);
};
export default MainLayout;
