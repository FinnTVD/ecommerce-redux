import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import {
	fetchCategory,
	fetchProduct,
	setCurrentPagination,
} from "../store/ProductSlice";
import CartProduct from "../pages/ShoppingCart/components/CartProduct";
import { setCartList } from "../store/ShoppingCartSlice";
import { category, urlApi } from "../utils/global";

import { Col, Layout, Menu, Row } from "antd";
import AvatarUser from "./AvatarUser";
import DarkMode from "./DarkMode";
import useNotificationAuth from "../hooks/useNotificationAuth";
const { Header, Content } = Layout;

const HomeLayout = () => {
	const [selectedKeys, setSelectedKeys] = useState(0);
	const { accessToken } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { pathname, state } = useLocation();
	console.log(
		"🚀 ~ file: HomeLayout.js:27 ~ HomeLayout ~ pathname:",
		pathname
	);

	const [contextHolder, openNotificationWithIcon] = useNotificationAuth();
	const { isAddSuccess, isDelete } = useSelector(
		(state) => state.shoppingCart
	);

	const keyLocation = category.findIndex(
		(e) => e.value === pathname.slice(1)
	);

	useEffect(() => {
		setSelectedKeys(keyLocation);
		if (state?.status === 200) {
			openNotificationWithIcon("success", "Đăng nhập thành công!");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		accessToken && getCartList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isDelete, isAddSuccess, accessToken]);

	const getCartList = async (page) => {
		const res = await axios.get(`${urlApi}/shoppingCart`);
		const data = await res.data;
		dispatch(setCartList(data));
	};

	const handleChangeCategory = (e) => {
		pathname !== "/" && navigate("/");
		dispatch(setCurrentPagination(1));
		setSelectedKeys(e.key);
		dispatch(fetchCategory(category[e.key].value));
	};

	const handleClickCard = useCallback(() => {
		if (pathname === "/shopping-cart") return;
		if (!accessToken) return navigate("/sign-in");
		navigate("/shopping-cart");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	const handleClickHome = () => {
		pathname !== "/" && navigate("/");
		dispatch(setCurrentPagination(1));
		setSelectedKeys(-1);
		dispatch(fetchProduct());
	};

	return (
		<Layout className="layout dark:bg-[#0f172a]">
			{contextHolder}
			<Header className="fixed inset-0 z-50 flex justify-between w-full dark:bg-[#0f172a]">
				<Row style={{ width: "100%" }}>
					<Col span={16}>
						<div className="flex">
							<div
								onClick={handleClickHome}
								className="flex items-center w-auto px-4 text-white cursor-pointer logo hover:text-gray-300"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="w-12 h-12 "
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
									/>
								</svg>
							</div>

							<Menu
								style={{ userSelect: "none", width: "100%" }}
								onClick={handleChangeCategory}
								theme="dark"
								mode="horizontal"
								selectedKeys={[`${selectedKeys}`]}
								items={category.map((e, index) => {
									const key = index;
									return {
										key,
										label: e.title,
									};
								})}
							/>
						</div>
					</Col>
					<Col
						span={8}
						className="flex items-center justify-end gap-x-4"
					>
						<DarkMode />
						<CartProduct handleClickCard={handleClickCard} />
						{accessToken && <AvatarUser />}
					</Col>
				</Row>
			</Header>
			<Content
				style={{
					padding: "0 50px",
				}}
			>
				<div className="h-20 dark:bg-[#0f172a]"></div>
				<div className="site-layout-content bg-white dark:bg-[#0f172a]">
					<Outlet />
				</div>
			</Content>
		</Layout>
	);
};
export default HomeLayout;
