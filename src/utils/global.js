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

export const categoryMobile = [
	{
		title: "Tất cả sản phẩm",
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

// export const urlApi = "http://localhost:3000";
export const urlApi = "https://api-ecommerce-redux.vercel.app";
export const portAuth = "http://localhost:5000";
export const urlApiShoppingCart = `${urlApi}/shoppingCart/`;
export const cookie_domain = window.location.hostname;

export const checkValueObjectEqualTrue = (obj) =>
	Object.values(obj).every((e) => e !== null && e !== undefined && e !== "");

export const optionLanguages = {
	en: "English",
	vi: "Tiếng việt",
};
