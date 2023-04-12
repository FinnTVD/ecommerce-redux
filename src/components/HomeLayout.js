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
import { category, categoryMobile, urlApi } from "../utils/global";
import AvatarUser from "./AvatarUser";
import DarkMode from "./DarkMode";
import useNotificationAuth from "../hooks/useNotificationAuth";

import { Col, Drawer, Layout, Menu, Row } from "antd";
import useResize from "../hooks/useResize";
const { Header, Content } = Layout;

const HomeLayout = () => {
	const [selectedKeys, setSelectedKeys] = useState(0);
	const { accessToken } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { pathname, state } = useLocation();
	const widthScreen = useResize();
	const [open, setOpen] = useState(false);

	const [contextHolder, openNotificationWithIcon] = useNotificationAuth();
	const { isAddSuccess, isDelete } = useSelector(
		(state) => state.shoppingCart
	);

	const keyLocation =
		widthScreen < 768
			? categoryMobile.findIndex((e) => e.value === pathname.slice(1))
			: category.findIndex((e) => e.value === pathname.slice(1));

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
		e.mode === "mobile" && onClose();
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
		widthScreen < 768 ? setSelectedKeys(0) : setSelectedKeys(-1);
		dispatch(fetchProduct());
	};
	const showDrawer = () => {
		setOpen(true);
	};
	const onClose = () => {
		setOpen(false);
	};

	return (
		<Layout className="layout dark:bg-[#0f172a] w-full">
			{contextHolder}
			<Header className="w-full fixed inset-0 z-50 flex justify-between dark:bg-[#0f172a] max-sm:px-0">
				<Row className="w-full">
					<Col md={{ span: 16 }} lg={{ span: 16 }} xs={{ span: 6 }}>
						<div className="flex h-full">
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
							{widthScreen >= 992 && (
								<Menu
									className="menu-home select-none w-full bg-transparent text-white font-semibold"
									onClick={handleChangeCategory}
									mode="horizontal"
									selectedKeys={[`${selectedKeys}`]}
									items={category.map((e, index) => {
										const key = index;
										return {
											key,
											label: e.title,
											className: "item-category",
										};
									})}
								/>
							)}
							{widthScreen < 992 && (
								<>
									<div
										onClick={showDrawer}
										className="z-50 flex items-center text-white cursor-pointer"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="currentColor"
											className="w-10 h-10"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
											/>
										</svg>
									</div>
									<Drawer
										title={
											<h1 className="text-2xl font-bold">
												Danh mục
											</h1>
										}
										placement="left"
										onClose={onClose}
										open={open}
										className="dark:bg-[#0f172a]"
									>
										{categoryMobile.map((e, index) => (
											<p
												onClick={() =>
													handleChangeCategory({
														key: index,
														mode: "mobile",
													})
												}
												className={`${
													index === selectedKeys &&
													"dark:bg-white bg-[#a8aaae] dark:!text-black !font-bold"
												} py-3 dark:text-white font-medium cursor-pointer hover:bg-[#545353]`}
												key={index}
											>
												{e.title}
											</p>
										))}
									</Drawer>
								</>
							)}
						</div>
					</Col>
					<Col
						md={{ span: 8 }}
						lg={{ span: 8 }}
						xs={{ span: 18 }}
						className="flex items-center justify-end pr-4 gap-x-4"
					>
						<DarkMode />
						<CartProduct handleClickCard={handleClickCard} />
						{accessToken && <AvatarUser />}
					</Col>
				</Row>
			</Header>
			<Content className="max-sm:min-h-screen w-full sm:py-0 sm:px-[50px]">
				<div className="site-layout-content !pt-20 max-sm:!pt-[72px] bg-white dark:bg-[#0f172a] max-sm:p-4">
					<Outlet />
				</div>
			</Content>
		</Layout>
	);
};
export default HomeLayout;
