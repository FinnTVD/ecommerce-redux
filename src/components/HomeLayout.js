import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

import { fetchProduct } from "../store/ProductSlice";
import PopoverCard from "../pages/ShoppingCart/components/PopoverCard";
import BadgeCard from "../pages/ShoppingCart/components/BadgeCard";
import { setCartList } from "../store/ShoppingCartSlice";
import { category, urlApi } from "../utils/global";

import { Col, Layout, Menu, Row, theme } from "antd";
import AvatarUser from "./AvatarUser";
import useToken from "../hooks/useToken";
import DarkMode from "./DarkMode";
import useDarkMode from "../hooks/useDarkMode";
import { setUser } from "../store/UserSlice";
const { Header, Content } = Layout;

const HomeLayout = () => {
	const [darkMode] = useDarkMode();
	const [selectedKeys, setSelectedKeys] = useState(0);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();
	const isToken = useToken();

	const { isAddSuccess, isDelete } = useSelector(
		(state) => state.shoppingCart
	);

	const keyLocation = category.findIndex(
		(e) => e.value === location.pathname.slice(1)
	);

	useEffect(() => {
		setSelectedKeys(keyLocation);
		const { user } = JSON.parse(localStorage.getItem("token"));
		dispatch(setUser(user));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		isToken && getCartList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isDelete, isAddSuccess]);

	const getCartList = async (page) => {
		const res = await axios.get(`${urlApi}/shoppingCart`);
		const data = await res.data;
		dispatch(setCartList(data));
	};

	const handleChangeCategory = (e) => {
		setSelectedKeys(e.key);
		if (Number(e.key) === 0) {
			navigate("/");
		} else {
			navigate(`/${category[e.key].value}`);
		}
	};

	const handleClickCard = () => {
		if (!isToken) return navigate("/sign-in");
		navigate("/shopping-cart");
	};

	const handleClickHome = () => {
		navigate("/");
		dispatch(fetchProduct());
	};
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	return (
		<Layout className="layout dark:bg-[#0f172a]">
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
					<Col span={8} className="flex items-center justify-end">
						<DarkMode />
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
						{isToken && <AvatarUser />}
					</Col>
				</Row>
			</Header>
			<Content
				style={{
					padding: "0 50px",
				}}
			>
				<div className="mt-20"></div>
				<div
					className="site-layout-content dark:bg-[#0f172a]"
					style={{
						background: !darkMode && colorBgContainer,
					}}
				>
					<Outlet />
				</div>
			</Content>
		</Layout>
	);
};
export default HomeLayout;
