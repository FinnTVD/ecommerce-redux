import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

import { fetchCategory, fetchProduct } from "../store/ProductSlice";
import PopoverCard from "../pages/ShoppingCart/components/PopoverCard";
import BadgeCard from "../pages/ShoppingCart/components/BadgeCard";
import { setCartList, setShoppingCart } from "../store/ShoppingCartSlice";

import { Breadcrumb, Col, Layout, Menu, Row, theme } from "antd";

const { Header, Content } = Layout;

const category = [
	{
		title: "Tất cả",
		value: "",
	},
	{
		title: "Điện thoại",
		value: "smartphone",
	},
	{
		title: "Laptop",
		value: "laptop",
	},
	{
		title: "Máy tính bảng",
		value: "tablet",
	},
	{
		title: "Âm thanh",
		value: "sound",
	},
	{
		title: "Đồng hồ",
		value: "watch",
	},
];

const HomeLayout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isAddSuccess, isDelete } = useSelector(
		(state) => state.shoppingCart
	);

	const {
		token: { colorBgContainer },
	} = theme.useToken();

	useEffect(() => {
		getCartList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isDelete, isAddSuccess]);

	const getCartList = async (page) => {
		const res = await axios.get("http://localhost:3000/shoppingCart");
		const data = await res.data;
		dispatch(setCartList(data));
	};

	const handleChangeCategory = async (e) => {
		try {
			if (e.key == 0) {
				dispatch(fetchProduct());
			} else {
				dispatch(fetchCategory(category[e.key].value));
			}
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	const handleClickCard = () => {
		navigate("/shopping-cart");
	};

	const handleClickHome = () => {
		navigate("/");
		dispatch(fetchProduct());
	};

	return (
		<Layout className="layout">
			<Header className="fixed inset-0 z-50 w-full flex justify-between">
				<Row style={{ width: "100%" }}>
					<Col span={16}>
						<div className="flex">
							<div
								onClick={handleClickHome}
								className="flex w-auto items-center px-4 text-white cursor-pointer logo hover:text-gray-300"
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
								defaultSelectedKeys={["0"]}
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
					<Col span={8} className="flex justify-end items-center">
						<BadgeCard>
							<PopoverCard>
								<svg
									onClick={handleClickCard}
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="w-10 h-10 text-white cursor-pointer"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
									/>
								</svg>
							</PopoverCard>
						</BadgeCard>
					</Col>
				</Row>
			</Header>
			<Content
				style={{
					padding: "0 50px",
				}}
			>
				<Breadcrumb
					style={{
						margin: "16px 0",
					}}
				>
					<Breadcrumb.Item>Home</Breadcrumb.Item>
				</Breadcrumb>
				<div
					className="site-layout-content"
					style={{
						background: colorBgContainer,
					}}
				>
					<Outlet />
				</div>
			</Content>
		</Layout>
	);
};
export default HomeLayout;
