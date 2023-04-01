export const category = [
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
export const portAuth = "http://localhost:5000";
export const urlApiShoppingCart = `${urlApi}/shoppingCart/`;
export const cookie_domain = "localhost";

export const checkValueObjectEqualTrue = (obj) =>
	Object.values(obj).every((e) => e !== null && e !== undefined && e !== "");
