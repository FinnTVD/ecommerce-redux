import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { saveToken } from "../utils/auth";
import { setUser } from "../store/AuthSlice";
import MenuUser from "./MenuUser";

import { UserOutlined } from "@ant-design/icons";
import { Avatar, Drawer } from "antd";
import { getAvatarUser } from "../utils/avatarUser";

const AvatarUser = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const { user, avatarUser } = useSelector((state) => state.auth);

	useEffect(() => {
		getAvatarUser(user.email, dispatch);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

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
				className="avatarUser flex items-center justify-center bg-transparent cursor-pointer h-[42px]"
				size={{
					xs: 50,
					sm: 56,
					md: 56,
					lg: 64,
					xl: 64,
					xxl: 80,
				}}
				icon={!avatarUser && <UserOutlined />}
			>
				{avatarUser && (
					<img
						src={avatarUser}
						className="rounded-[50%] h-10 w-10 object-cover"
						alt="avatarUser"
					/>
				)}
			</Avatar>
			<Drawer
				title={user.name ?? ""}
				placement="right"
				onClose={onClose}
				open={open}
				className="dark:bg-[#0f172a] dark:text-white"
			>
				<MenuUser handleSignOut={handleSignOut} onClose={onClose} />
			</Drawer>
		</>
	);
};
export default AvatarUser;
