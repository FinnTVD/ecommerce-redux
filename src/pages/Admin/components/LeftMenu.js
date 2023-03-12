import React from "react";

import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const LeftMenu = () => {
	return (
		<Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
			<Menu.Item key="1">
				<UserOutlined />
				<span>List Product</span>
				<Link to="/" />
			</Menu.Item>
			<Menu.Item key="2">
				<VideoCameraOutlined />
				<span>List User</span>
				<Link to="/users" />
			</Menu.Item>
		</Menu>
	);
};

export default LeftMenu;
