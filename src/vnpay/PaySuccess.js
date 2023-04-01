import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import FireWorks from "./FireWorks";
import { urlApiShoppingCart } from "../utils/global";

import { Button } from "antd";

const PaySuccess = () => {
	const navigate = useNavigate();
	const { search } = useLocation();

	useEffect(() => {
		if (search) {
			const listIdProduct = getListIdProduct(search);
			deleteProducts(urlApiShoppingCart, listIdProduct);
		} else {
			navigate("/");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	if (!search) return;

	const deleteProducts = (url, listIdProduct = []) => {
		listIdProduct.forEach((e) => axios.delete(`${url}${e}`));
	};

	const getListIdProduct = (search) => {
		if (!search) return;
		let listIdProduct = search
			.slice(1)
			.split("&")
			.filter((e) => e.includes("mgd__"))
			.join("")
			.split("__")[1]
			.split("-");
		return listIdProduct;
	};

	return (
		<div className="relative h-screen max-h-screen overflow-hidden text-center">
			<div className="z-[99999] absolute inset-0 flex flex-col items-center">
				<h1 className="text-3xl font-extrabold">
					thanh toán đơn hàng thành công!
				</h1>
				<div className="flex flex-col">
					<Link to="/shopping-cart">
						<Button type="primary" ghost>
							Giao dịch khác
						</Button>
					</Link>
					<Link to="/">
						<Button type="primary">Trang chủ</Button>
					</Link>
				</div>
			</div>
			<FireWorks />
		</div>
	);
};

export default PaySuccess;
