import { Button } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { urlApiShoppingCart } from "../utils/global";
import FireWorks from "./FireWorks";

const PaySuccess = () => {
	const { search } = useLocation();
	console.log("🚀 ~ file: PaySuccess.js:8 ~ PaySuccess ~ search:", search);

	useEffect(() => {
		if (search) {
			const listIdProduct = getListIdProduct(search);
			console.log(
				"🚀 ~ file: PaySuccess.js:16 ~ useEffect ~ listIdProduct:",
				listIdProduct
			);
			deleteProducts(urlApiShoppingCart, listIdProduct);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
		<div className="h-screen max-h-screen text-center relative overflow-hidden">
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
