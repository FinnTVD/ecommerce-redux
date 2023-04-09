import { memo, useEffect, useState } from "react";
import axios from "axios";

import { Col, Row } from "antd";

const SelectLocation = ({
	handleValueInput,
	value,
	codeDisTrict,
	codeWard,
	setIsConnect,
}) => {
	const [provinces, setProvinces] = useState([]);
	const [districts, setDisTricts] = useState([]);
	const [wards, setWards] = useState([]);

	useEffect(() => {
		getProvinces();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		codeDisTrict && getDisTricts(codeDisTrict);
	}, [codeDisTrict]);

	useEffect(() => {
		codeWard && getWards(codeWard);
	}, [codeWard]);

	const getProvinces = async () => {
		try {
			const res = await axios.get("https://provinces.open-api.vn/api/p");
			const data = res.data;
			setProvinces(data);
		} catch (error) {
			setIsConnect(true);
		}
	};

	const getDisTricts = async (codeDisTrict) => {
		try {
			const res = await axios.get("https://provinces.open-api.vn/api/d");
			const data = res.data;
			const dataNew = data.filter(
				(e) => e.province_code === codeDisTrict
			);
			setDisTricts(dataNew);
		} catch (error) {}
	};

	const getWards = async (codeWard) => {
		try {
			const res = await axios.get("https://provinces.open-api.vn/api/w");
			const data = res.data;
			const dataNew = data.filter((e) => e.district_code === codeWard);
			setWards(dataNew);
		} catch (error) {
			console.log("getWards/selecyions.js:", error);
		}
	};

	return (
		<div className="border border-gray-300 rounded-[4px] max-h-250px h-[250px] overflow-hidden mt-4">
			{" "}
			<Row>
				<Col span={8}>
					<button
						className={`${
							codeDisTrict ? "cursor-not-allowed" : ""
						} ${
							!codeDisTrict
								? "text-[#ee4d2d] border-b border-[#ee4d2d]"
								: ""
						} px-2 py-1 text-center w-full`}
					>
						Tỉnh\ Thành Phố
					</button>
					<div className="overflow-y-scroll h-[218px] custom-scroll ">
						{!value &&
							provinces.length > 0 &&
							provinces.map((e) => (
								<p
									className="px-2 py-1 pb-2 text-xs font-medium hover:bg-gray-300"
									onClick={() => handleValueInput(e)}
									key={e.code + e.name}
								>
									{e.name}
								</p>
							))}
					</div>
				</Col>
				<Col span={8}>
					<button
						disabled={value ? false : true}
						className={`${
							value && !codeWard ? "" : "cursor-not-allowed"
						} ${
							codeDisTrict && !codeWard
								? "text-[#ee4d2d] border-b border-[#ee4d2d]"
								: ""
						} px-2 py-1 text-center w-full`}
					>
						Quận\ Huyện
					</button>
					<div className="overflow-y-scroll h-[218px] custom-scroll">
						{codeDisTrict &&
							!codeWard &&
							districts.length > 0 &&
							districts.map((e) => (
								<p
									className="px-2 py-1 pb-2 text-xs font-medium hover:bg-gray-300"
									onClick={() => handleValueInput(e)}
									key={e.code + e.name}
								>
									{e.name}
								</p>
							))}
					</div>
				</Col>
				<Col span={8}>
					<button
						disabled={value ? false : true}
						className={`${codeWard ? "" : "cursor-not-allowed"} ${
							codeWard
								? "text-[#ee4d2d] border-b border-[#ee4d2d]"
								: ""
						} px-2 py-1 text-center w-full`}
					>
						Phường\ Xã
					</button>
					<div className="overflow-y-scroll h-[218px] custom-scroll">
						{codeWard &&
							wards.length > 0 &&
							wards.map((e) => (
								<p
									className="px-2 py-1 pb-2 text-xs font-medium hover:bg-gray-300"
									onClick={() => handleValueInput(e)}
									key={e.code + e.name}
								>
									{e.name}
								</p>
							))}
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default memo(SelectLocation);
