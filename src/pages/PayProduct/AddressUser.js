import { memo, useState } from "react";

import SelectLocation from "./SelectLocation";
import { checkValueObjectEqualTrue } from "../../utils/global";

import { Button, Checkbox, Modal } from "antd";

const AddressUser = ({
	isModalOpen,
	handleOk,
	handleCancel,
	infoUser,
	setInfoUser,
}) => {
	const [value, setValue] = useState("");
	const [isCheck, setIsCheck] = useState(true);
	const [codeDisTrict, setCodeDisTrict] = useState(null);
	const [codeWard, setCodeWard] = useState(null);
	const [isConnect, setIsConnect] = useState(false);

	const handleValueInput = (e) => {
		!codeDisTrict ? setCodeDisTrict(e.code) : setCodeWard(e.code);
		setValue((pre) => (pre ? pre + " - " + e.name : e.name));
		if (codeDisTrict && codeWard) {
			setIsCheck(false);
			setInfoUser({
				...infoUser,
				address: value + " - " + e.name,
			});
		}
	};

	const handleResetValue = () => {
		setValue("");
		setCodeDisTrict(null);
		setCodeWard(null);
		setIsCheck(true);
	};

	const handleChangeInput = (e) => {
		setInfoUser({
			...infoUser,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<>
			<Modal
				title={
					!isConnect
						? "Địa chỉ mới"
						: "📢 Hiện đang có lỗi từ hệ thống, rất xin lỗi về trải nghiệm của quý khách. Chúng tối sẽ khắc phục một cách sớm nhất."
				}
				open={isModalOpen}
				onOk={handleOk}
				onCancel={() => {
					handleCancel();
					handleResetValue();
				}}
				footer={
					!isConnect && [
						<Checkbox
							key="checkbox"
							defaultChecked={true}
							className="select-none mr-[157px] text-black dark:!text-black"
						>
							Đặt làm địa chỉ mặc định
						</Checkbox>,
						<Button key="back" onClick={handleCancel}>
							Cancel
						</Button>,
						<Button
							key="submit"
							type="primary"
							disabled={!checkValueObjectEqualTrue(infoUser)}
							onClick={handleOk}
						>
							Ok
						</Button>,
					]
				}
			>
				{isConnect && (
					<div>
						<img
							src="/image/address-disconnect.jpg"
							alt=""
							className="object-cover w-full h-full"
						/>
					</div>
				)}
				{!isConnect && (
					<div className="flex flex-col gap-y-4">
						<p>Để đặt hàng, vui lòng thêm địa chỉ nhận hàng</p>
						<div className="flex justify-between gap-x-4">
							<input
								className="w-full p-[10px] outline-none border border-gray-300 rounded-[4px] focus:border-gray-500 "
								type="text"
								placeholder="Họ và tên"
								autoComplete="off"
								name="name"
								defaultValue={infoUser.name}
								onChange={handleChangeInput}
							/>
							<input
								className="w-full p-[10px] outline-none border border-gray-300 rounded-[4px] focus:border-gray-500"
								type="text"
								name="phone"
								placeholder="Số điện thoại"
								autoComplete="off"
								defaultValue={infoUser.phone}
								onChange={handleChangeInput}
							/>
						</div>
						<div className="relative address-input">
							<input
								className="w-full p-[10px] outline-none border border-gray-300 rounded-[4px] focus:border-gray-500 select-none"
								type="text"
								name="address"
								placeholder="Tỉnh\ Thành Phố, Quận\ Huyện, Xã\ Phường"
								autoComplete="off"
								disabled
								defaultValue={value || ""}
							/>
							{value && (
								<div
									className="absolute top-[10px] right-[10px] z-50"
									onClick={handleResetValue}
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
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</div>
							)}
							{isCheck && (
								<SelectLocation
									handleValueInput={handleValueInput}
									value={value}
									codeDisTrict={codeDisTrict}
									codeWard={codeWard}
									setIsConnect={setIsConnect}
								/>
							)}
						</div>
						<input
							className="w-full p-[10px] outline-none border border-gray-300 rounded-[4px] focus:border-gray-500"
							type="text"
							name="detailAddress"
							placeholder="Địa chỉ cụ thể"
							autoComplete="off"
							defaultValue={infoUser.detailAddress}
							onChange={handleChangeInput}
						/>
					</div>
				)}
			</Modal>
		</>
	);
};
export default memo(AddressUser);
