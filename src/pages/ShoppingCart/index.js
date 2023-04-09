import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddressUser from "../PayProduct/AddressUser";
import TableShoppingCart from "./components/TableShoppingCart";
import { checkValueObjectEqualTrue } from "../../utils/global";

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

	const handleOk = useCallback(() => {
		checkValueObjectEqualTrue(infoUser) &&
			navigate("/confirm-pay", {
				state: {
					infoUser,
					totalBill,
					length: selectedRowKeys.length,
					selectedRowKeys,
				},
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [infoUser]);

	const handleCancel = useCallback(() => {
		setIsModalOpen(false);
	}, []);

	const handleBuyProduct = () => {
		if (selectedRowKeys.length === 0) return;
		showModal();
	};

	return (
		<>
			<TableShoppingCart />
			<div className="flex items-center justify-end mb-10 max-sm:text-base text-lg font-bold gap-x-3">
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
					className="max-sm:px-2 max-sm:py-1 max-sm:text-base px-10 py-3 bg-orange-500 rounded-sm text-white text-lg font-medium disabled:bg-gray-500"
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
