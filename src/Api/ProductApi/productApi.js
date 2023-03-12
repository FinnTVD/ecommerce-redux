import axiosClient from "../axiosClient";

export const productApi = {
	getAll(params) {
		const url = "listProduct";
		return axiosClient.get(url, { params });
	},
	getProductId(id) {
		const url = `listProduct/${id}`;
		return axiosClient.get(url);
	},
	deleteProduct(id) {
		const url = `listProduct/${id}`;
		return axiosClient.delete(url);
	},
	updateProduct(id, data) {
		const url = `listProduct/${id}`;
		return axiosClient.put(url, data);
	},
	addProduct(data) {
		const url = "listProduct";
		return axiosClient.post(url, data);
	},
};
