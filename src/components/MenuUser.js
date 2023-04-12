import { Button } from "antd";
import { memo } from "react";
import { NavLink } from "react-router-dom";

const menuUser = [
	{ id: 1, content: "Thông tin cá nhân", path: "/profile-user" },
	{ id: 2, content: "Đăng bán sản phẩm", path: "/post-product" },
	{ id: 3, content: "Sản phẩm của tôi", path: "" },
	{ id: 4, content: "No update", path: "" },
];

const MenuUser = ({ handleSignOut, onClose }) => {
	return (
		<div className="flex flex-col gap-y-2">
			{menuUser.map((e) => (
				<NavLink
					to={e.path}
					className="py-2 px-3 rounded-lg hover:bg-[#1677ff] hover:text-white"
					key={e.id}
					onClick={onClose}
				>
					{e.content}
				</NavLink>
			))}
			<Button
				type="primary"
				className="flex gap-x-2 justify-center"
				danger
				onClick={handleSignOut}
			>
				Đăng xuất
				<div className="rotate-180">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
						/>
					</svg>
				</div>
			</Button>
		</div>
	);
};

export default memo(MenuUser);
