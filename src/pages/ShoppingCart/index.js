import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddressUser from "../PayProduct/AddressUser";
import TableShoppingCart from "./components/TableShoppingCart";

const ShoppingCart = () => {
	const { selectedRowKeys } = useSelector((state) => state.shoppingCart);
	const totalBill = selectedRowKeys.reduce((a, e) => a + e.listPrice, 0);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();
	const [infoUser, setInfoUser] = useState({
		name: "",
		phone: "",
		address: "",
		detailAddress: "",
	});

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
		navigate("/confirm-pay", {
			state: {
				infoUser,
				totalBill,
				length: selectedRowKeys.length,
				selectedRowKeys,
			},
		});
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const handleBuyProduct = () => {
		if (selectedRowKeys.length === 0) return;
		showModal();
		//
		// window.open(
		// 	`http://localhost:8888/order/create_payment_url?amount=${totalBill}`,
		// 	"_blank"
		// );
	};

	return (
		<>
			<TableShoppingCart />
			<div className="flex items-center justify-end text-lg font-bold gap-x-3 mb-10">
				<span className="dark:text-white">
					Tổng thanh toán ({selectedRowKeys.length} Sản phẩm):
				</span>
				<span className="text-[#d70018]">
					{totalBill.toLocaleString("vi", {
						style: "currency",
						currency: "VND",
					})}
				</span>
				<button
					onClick={handleBuyProduct}
					disabled={selectedRowKeys.length === 0}
					className="px-10 py-3 bg-orange-500 rounded-sm text-white text-[18px] font-medium disabled:bg-gray-500"
				>
					Mua hàng
				</button>
				<AddressUser
					isModalOpen={isModalOpen}
					handleOk={handleOk}
					handleCancel={handleCancel}
					infoUser={infoUser}
					setInfoUser={setInfoUser}
				/>
			</div>
		</>
	);
};

export default ShoppingCart;
