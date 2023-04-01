import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import TableProductPay from "./TableProductPay";

import { Modal } from "antd";

const ConfirmPay = () => {
	const { state } = useLocation();
	const navigate = useNavigate();

	const mgd = state?.selectedRowKeys
		.reduce((a, b) => a + "-" + b.id, "")
		.slice(1);

	const handlePayBill = () => {
		if (!state) return;
		window.open(
			`http://localhost:8888/order/create_payment_url?amount=${state?.totalBill}&mgd=${mgd}`,
			"_self"
		);
	};

	const warning = () => {
		Modal.warning({
			title: "Giỏ hàng của bạn đang trống.",
			content: (
				<div>
					<p>
						Một số sản phẩm trong giỏ hàng vừa được cập nhật, bạn
						vui lòng kiểm tra giỏ hàng và thử lại.
					</p>
				</div>
			),
			onOk() {
				navigate("/shopping-cart");
			},
		});
	};

	!state && warning();

	return (
		<div>
			<div className="address-user"></div>
			<div className="flex items-center text-[#ee4d2d] text-2xl font-bold gap-x-1 mt-6">
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
						d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
					/>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
					/>
				</svg>
				<h1 className="dark:text-[#53a6c5]">Địa Chỉ Nhận Hàng</h1>
			</div>
			<div className="flex items-center mb-10 text-lg gap-x-4 dark:text-white">
				<span className="font-bold">
					{state?.infoUser?.name} (+84){" "}
					{state?.infoUser?.phone.slice(1)}
				</span>
				<span>
					{state?.infoUser?.detailAddress},{" "}
					{state?.infoUser?.address.split(" - ").reverse().join(", ")}
				</span>
				<span className="border border-[#ee4d2d] text-[#ee4d2d] dark:text-[#53a6c5] dark:border-blue-500">
					Mặc định
				</span>
				<button>Thay đổi</button>
			</div>
			<TableProductPay selectedRowKeys={state?.selectedRowKeys} />
			<div className="flex items-center gap-x-3 justify-end h-[118px] border-b border-gray-300">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="currentColor"
					className="w-6 h-6 text-[#ee4d2d]"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
					/>
				</svg>
				<span className="dark:text-white">
					Nhập mã giảm giá (nếu có):{" "}
				</span>
				<input
					type="text"
					name="voucher"
					className="px-2 py-1 border border-gray-300 rounded-md outline-none focus:border-blue-500"
					autoComplete="off"
				/>
			</div>
			<div className="flex items-center justify-end text-lg font-bold gap-x-3 h-[118px] dark:text-white">
				<span>Tổng thanh toán ({state?.length} Sản phẩm):</span>
				<span className="text-[#FF4136] dark:text-[#53a6c5]">
					{state?.totalBill.toLocaleString("vi", {
						style: "currency",
						currency: "VND",
					})}
				</span>
				<button
					onClick={handlePayBill}
					disabled={!state}
					className={`${
						state
							? "hover:bg-[#e15312]"
							: "bg-gray-500 cursor-not-allowed"
					} bg-[#FF4136] text-white font-semibold rounded-md px-6 py-1 select-none`}
				>
					Đặt hàng
				</button>
			</div>
			<div className="address-user"></div>
		</div>
	);
};

export default ConfirmPay;

// Ngân hàng	NCB
// Số thẻ	9704198526191432198
// Tên chủ thẻ	NGUYEN VAN A
// Ngày phát hành	07/15
// Mật khẩu OTP	123456
// https://sandbox.vnpayment.vn/merchantv2/
