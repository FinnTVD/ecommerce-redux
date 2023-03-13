import React from "react";
import { useSelector } from "react-redux";
import TableShoppingCart from "./components/TableShoppingCart";

const ShoppingCart = () => {
	const { shoppingCart, selectedRowKeys } = useSelector(
		(state) => state.shoppingCart
	);

	const totalBill = () => {
		let sumPrice = 0;
		for (let i = 0; i < shoppingCart.length; i++) {
			for (let j = 0; j < selectedRowKeys.length; j++)
				if (shoppingCart[i].id == selectedRowKeys[j]) {
					sumPrice += shoppingCart[i].listPrice;
				}
		}
		return sumPrice.toLocaleString("vi", {
			style: "currency",
			currency: "VND",
		});
	};

	return (
		<>
			<TableShoppingCart />
			<div className="flex items-center justify-end text-lg font-bold gap-x-3">
				<span>
					Tổng thanh toán ({selectedRowKeys.length} Sản phẩm):
				</span>
				<span className="text-[#d70018]">{totalBill()}</span>
				<button className="px-10 py-3 bg-orange-500 rounded-sm text-white text-[18px] font-medium">
					Mua hàng
				</button>
			</div>
		</>
	);
};

export default ShoppingCart;
