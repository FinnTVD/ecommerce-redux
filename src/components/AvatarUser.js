import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { saveToken } from "../utils/auth";
import { setUser } from "../store/AuthSlice";
import MenuUser from "./MenuUser";

import { UserOutlined } from "@ant-design/icons";
import { Avatar, Drawer } from "antd";

const AvatarUser = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const { user } = useSelector((state) => state.auth);

	const handleSignOut = useCallback(() => {
		saveToken();
		dispatch(
			setUser({
				user: undefined,
				accessToken: null,
			})
		);
		navigate("/sign-in");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!user) return;
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
				<MenuUser handleSignOut={handleSignOut} />
			</Drawer>
		</>
	);
};
export default AvatarUser;
