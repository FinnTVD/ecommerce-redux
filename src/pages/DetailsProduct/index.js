import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { Col, Image, Row, Rate, message } from "antd";

import { setIsAddSuccess } from "../../store/ShoppingCartSlice";
import SkeletonCard from "../Products/components/SkeletonCard";
import useToken from "../../hooks/useToken";
import { urlApi } from "../../utils/global";

const DetailsProduct = () => {
	const { id } = useParams();
	const [item, setItem] = useState([]);
	const navigate = useNavigate();
	const isToken = useToken();
	console.log("🚀 ~ file: index.js:17 ~ DetailsProduct ~ isToken:", isToken);
	const { shoppingCart, isAddSuccess, idParam } = useSelector(
		(state) => state.shoppingCart
	);
	const dispatch = useDispatch();

	const [messageApi, contextHolder] = message.useMessage();
	const key = "addProductCart";

	const openMessage = () => {
		messageApi.open({
			key,
			type: "loading",
			content: "Loading...",
		});
		setTimeout(() => {
			messageApi.open({
				key,
				type: "success",
				content: "Sản phẩm đã được thêm vào giỏ hàng!",
				duration: 1,
			});
		}, 1000);
	};

	useEffect(() => {
		axios.get(`${urlApi}/listProduct`).then((res) => {
			setItem(res.data.filter((e) => e.id == id));
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [idParam]);

	const addProduct = async () => {
		try {
			if (
				shoppingCart.length > 0 &&
				shoppingCart.some((e) => e.id == id)
			) {
				const res = await axios.put(
					`${urlApi}/shoppingCart/${id}`,
					item[0]
				);
				console.log("🚀 ~ file: index.js:61 ~ addProduct ~ res:", res);
				res.status === 200 && dispatch(setIsAddSuccess(!isAddSuccess));
			} else {
				const res = await axios.post(`${urlApi}/shoppingCart`, item[0]);
				console.log("🚀 ~ file: index.js:69 ~ addProduct ~ res:", res);
				res.status === 201 && dispatch(setIsAddSuccess(!isAddSuccess));
			}
			openMessage();
		} catch (error) {
			console.log(
				"🚀 ~ file: index.js:85 ~ handleAddProduct ~ error:",
				error
			);
		}
	};

	const handleAddProduct = () => {
		if (!isToken) return navigate("/sign-in");
		addProduct();
	};

	if (item.length === 0) return <SkeletonCard />;
	const { name, rating, option, description, sale, promote, listPrice } =
		item[0];

	return (
		<>
			{contextHolder}
			<div className="max-w-[1200px] w-full mx-auto">
				<div className="flex gap-x-10">
					<h1 className="text-3xl font-bold">{name}</h1>
					<Rate
						style={{
							display: "flex",
							alignItems: "center",
						}}
						disabled
						value={Math.round(rating.rate)}
					/>
					<span>{rating.review} đánh giá</span>
				</div>
				<Row gutter={24}>
					<Col className="gutter-row" span={8}>
						<div
							style={{
								border: "1px solid #e5e7eb",
								borderRadius: "10px",
								textAlign: "center",
								overflow: "hidden",
							}}
						>
							<Image
								className="object-cover"
								src={option[0].image}
								alt={name}
							/>
						</div>
					</Col>
					<Col className="gutter-row" span={8}>
						<div className="flex items-end mb-3 gap-x-4">
							<p className="text-[#d70018] text-lg font-bold">
								{sale.salePrice === 0
									? ""
									: sale.salePrice.toLocaleString("vi", {
											style: "currency",
											currency: "VND",
									  })}
							</p>
							<p className="text-[#707070] line-through text-sm font-semibold">
								{listPrice.toLocaleString("vi", {
									style: "currency",
									currency: "VND",
								})}
							</p>
						</div>
						<Row gutter={[16, 16]}>
							<Col span={24}>
								<h3 className="text-lg font-bold ">
									Mời bạn chọn màu
								</h3>
							</Col>
							{option.map((e, index) => {
								return (
									<Col
										className="gutter-row"
										span={8}
										key={index}
									>
										<div
											style={{
												display: "flex",
												cursor: "pointer",
												justifyContent: "center",
												border: "1px solid #e5e7eb",
												alignItems: "center",
												overflow: "hidden",
												borderRadius: "8px",
												gap: "0 4px",
											}}
										>
											<img
												className="w-[30px] h-[30px] object-contain"
												src={e.image}
												alt=""
											/>
											<div className="flex flex-col">
												<span className="text-sm font-medium">
													{e.color}
												</span>
												<span className="text-xs">
													{listPrice.toLocaleString(
														"vi",
														{
															style: "currency",
															currency: "VND",
														}
													)}
												</span>
											</div>
										</div>
									</Col>
								);
							})}
							<Col span={24}>
								<div
									style={{
										border: "1px solid #fee2e2",
										borderRadius: "10px",
										textAlign: "center",
										overflow: "hidden",
									}}
								>
									<div className="bg-[#fee2e2] text-[#d70018] flex p-3 items-center gap-x-3">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="currentColor"
											className="w-8 h-8"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
											/>
										</svg>
										<span className="text-base font-bold">
											Khuyến mãi
										</span>
									</div>
									<ul className="flex flex-col p-3 gap-y-3">
										{promote.map((item, index) => (
											<li
												key={index}
												className="flex gap-x-2"
											>
												<div className="flex items-center justify-center text-white font-semibold !w-4 h-4 rounded-full bg-[#d70018]">
													{index + 1}
												</div>
												<p className="text-start">
													{item}
												</p>
											</li>
										))}
									</ul>
								</div>
							</Col>
						</Row>
						<div className="flex gap-x-10 mt-8">
							<div
								onClick={handleAddProduct}
								className="flex gap-x-3 bg-[#ffeee8] text-[#f06137] py-2 px-4 font-medium border border-[#f06137] rounded-sm cursor-pointer select-none hover:bg-[#f8f4f2]"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
									/>
								</svg>
								<span>Thêm vào giỏ hàng</span>
							</div>
							<div className="px-4 py-2 font-medium text-white bg-orange-500 rounded-sm cursor-pointer select-none">
								Mua ngay
							</div>
						</div>
					</Col>
					<Col span={8}>
						<div
							style={{
								border: "1px solid #e5e7eb",
								borderRadius: "10px",
								padding: "24px",
								display: "flex",
								flexDirection: "column",
								gap: "16px 0",
							}}
						>
							<h2 className="text-base font-bold">
								Thông tin sản phẩm
							</h2>
							{description.status && (
								<div className="flex items-center gap-x-2">
									<div className="w-6 h-6">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="currentColor"
											className="w-6 h-6"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
											/>
										</svg>
									</div>
									<p>{description.status}</p>
								</div>
							)}
							{description.gift && (
								<div className="flex items-center gap-x-2">
									<div className="w-6 h-6">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="currentColor"
											className="w-6 h-6"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
											/>
										</svg>
									</div>
									<p>{description.gift}</p>
								</div>
							)}
							{description.guarantee && (
								<div className="flex items-center gap-x-2">
									<div className="w-6 h-6">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="currentColor"
											className="w-6 h-6"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
											/>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											/>
										</svg>
									</div>
									<p>{description.guarantee}</p>
								</div>
							)}
						</div>
					</Col>
				</Row>
			</div>
		</>
	);
};

export default DetailsProduct;
