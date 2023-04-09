import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { setIdParam } from "../../../store/ShoppingCartSlice";
import { setLengthShoppingCart } from "../../../store/ShoppingCartSlice";
import { urlApi } from "../../../utils/global";

import { Badge, Popover } from "antd";
import useResize from "../../../hooks/useResize";

const CartProduct = ({ handleClickCard }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const widthScreen = useResize();

	const { cartList } = useSelector((state) => state.shoppingCart);
	const { isDelete, isAddSuccess, lengthShoppingCart } = useSelector(
		(state) => state.shoppingCart
	);
	const { accessToken } = useSelector((state) => state.auth);

	useEffect(() => {
		accessToken &&
			axios.get(`${urlApi}/shoppingCart`).then((res) => {
				dispatch(setLengthShoppingCart(res.data.length));
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isDelete, isAddSuccess, accessToken]);

	return (
		<Badge
			className="select-none"
			count={lengthShoppingCart > 0 ? lengthShoppingCart : ""}
		>
			{widthScreen < 1024 ? (
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
			) : (
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
				</Popover>
			)}
		</Badge>
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

export default memo(CartProduct);
