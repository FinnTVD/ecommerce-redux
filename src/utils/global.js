export const category = [
	{
		title: "Tất cả",
		value: "",
	},
	{
		title: "Điện thoại",
		value: "smartphone",
	},
	{
		title: "Laptop",
		value: "laptop",
	},
	{
		title: "Máy tính bảng",
		value: "tablet",
	},
	{
		title: "Âm thanh",
		value: "sound",
	},
	{
		title: "Đồng hồ",
		value: "watch",
	},
];

export const customArray = (length) => {
	return new Array(length).fill(0);
};

export const urlApi = "http://localhost:3000";
export const portAuth = "http://localhost:3002";
export const urlApiShoppingCart = `${urlApi}/shoppingCart/`;
