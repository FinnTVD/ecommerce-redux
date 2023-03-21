import React from "react";
import { Popover } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIdParam } from "../../../store/ShoppingCartSlice";

const PopoverCard = ({ children }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { cartList } = useSelector((state) => state.shoppingCart);

	return (
		<Popover
			placement="bottomRight"
			title={
				<span>
					{cartList.length > 0
						? "Sản phẩm mới thêm"
						: "Chưa có sản phẩm"}
				</span>
			}
			content={content(cartList, navigate, dispatch)}
		>
			{children}
		</Popover>
	);
};

const content = (cartList, navigate, dispatch) => {
	const handleClickDetailProduct = (id) => {
		navigate(`/product/${id}`);
		dispatch(setIdParam(id));
	};

	const fiveAddNewProduct = cartList
		.slice(
			cartList.length - 5 <= 0 ? 0 : cartList.length - 5,
			cartList.length
		)
		.reverse();

	return (
		<>
			{cartList.length > 0 && (
				<>
					{fiveAddNewProduct.map((e) => {
						return (
							<div
								key={e.id}
								className="flex justify-between my-3 cursor-pointer hover:bg-gray-200"
								onClick={() => handleClickDetailProduct(e.id)}
							>
								<div className="flex ">
									<img
										className="object-contain w-10 h-10 mr-3"
										src={e.option[0]?.image}
										alt={e.name}
									/>
									<span
										title={e.name}
										className="max-w-[234px] inline-block truncate font-semibold"
									>
										{e.name}
									</span>
								</div>
								<span className="font-bold text-orange-600">
									{e.listPrice.toLocaleString("vi", {
										style: "currency",
										currency: "VND",
									})}
								</span>
							</div>
						);
					})}
					<div className="flex items-center justify-between gap-x-10">
						<span>
							{fiveAddNewProduct.length} sản phẩm được thêm vào
							gần đây nhất
						</span>
						<button
							onClick={() => navigate("/shopping-cart")}
							className="px-4 py-2 text-lg font-medium text-white bg-orange-500 rounded-sm"
						>
							Xem giỏ hàng
						</button>
					</div>
				</>
			)}
			{cartList.length === 0 && (
				<img
					src="https://th.bing.com/th/id/R.a562335b70240afef037b16236f0ee83?rik=FlaHQkFZorFb1w&pid=ImgRaw&r=0"
					alt="no-product"
				/>
			)}
		</>
	);
};

export default PopoverCard;
