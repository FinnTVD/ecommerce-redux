import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Drawer, Popover } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AvatarUser = () => {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const { user } = useSelector((state) => state.user);

	const handleSignOut = () => {
		localStorage.removeItem("token");
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
