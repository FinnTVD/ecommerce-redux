import { Button } from "antd";
import { NavLink } from "react-router-dom";

const menuUser = [
	{ id: 1, content: "Đăng bán sản phẩm", path: "/post-product" },
	{ id: 2, content: "Sản phẩm của tôi", path: "" },
	{ id: 3, content: "No update", path: "" },
];

const MenuUser = ({ handleSignOut }) => {
	console.log("render menuUser");
	return (
		<div className="flex flex-col gap-y-2">
			{menuUser.map((e) => (
				<NavLink
					to={e.path}
					className={`py-2 px-3 rounded-lg hover:bg-[#1677ff] hover:text-white`}
					key={e.id}
				>
					{e.content}
				</NavLink>
			))}
			<Button type="primary" danger onClick={handleSignOut}>
				Đăng xuất
			</Button>
		</div>
	);
};

export default MenuUser;
