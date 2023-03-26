import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Drawer } from "antd";
import { saveToken } from "../utils/auth";

const AvatarUser = () => {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const { user } = useSelector((state) => state.auth);

	const handleSignOut = () => {
		saveToken();
		navigate("/sign-in");
	};

	const showDrawer = () => {
		setOpen(true);
	};

	const onClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Avatar
				onClick={showDrawer}
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "transparent",
					cursor: "pointer",
					height: "40px",
				}}
				size={{
					sm: 24,
					md: 32,
					lg: 40,
					xl: 64,
					xxl: 80,
				}}
				icon={<UserOutlined />}
			/>
			<Drawer
				title={user.email ?? ""}
				placement="right"
				onClose={onClose}
				open={open}
				className="dark:bg-[#0f172a] dark:text-white"
			>
				<p>{user.name ?? ""}</p>
				<p>Some contents...</p>
				<Button type="primary" onClick={handleSignOut}>
					Đăng xuất
				</Button>
			</Drawer>
		</>
	);
};
export default AvatarUser;
