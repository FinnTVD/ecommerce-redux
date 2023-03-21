import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { urlApi } from "../utils/global";

const ProductSlice = createSlice({
	name: "product",
	initialState: {
		listProduct: [],
		isLoading: true,
		totalPagination: 0,
		currentPagination: 1,
	},
	reducers: {
		setListProduct: (state, action) => {
			state.listProduct = action.payload;
		},
		setCurrentPagination: (state, action) => {
			state.currentPagination = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchProduct.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(fetchProduct.fulfilled, (state, action) => {
			state.listProduct = action.payload.data;
			state.totalPagination = action.payload.length;
			state.isLoading = false;
		});
		builder.addCase(fetchProduct.rejected, (state, action) => {
			state.isLoading = false;
			console.log("reject");
		});
		builder.addCase(fetchCategory.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(fetchCategory.fulfilled, (state, action) => {
			state.listProduct = action.payload;
			state.totalPagination = action.payload.length;
			state.isLoading = false;
		});
		builder.addCase(fetchCategory.rejected, (state, action) => {
			state.isLoading = false;
			console.log("reject");
		});
	},
});

export const fetchProduct = createAsyncThunk(
	"fetchProduct",
	async (page = 1) => {
		const response = await axios.get(
			`${urlApi}/listProduct?_page=${page}&_limit=10`
		);
		const res = await axios.get(`${urlApi}/listProduct`);
		return {
			data: response.data,
			length: res.data.length,
		};
	}
);

export const fetchCategory = createAsyncThunk(
	"fetchCategory",
	async (category) => {
		const response = await axios.get(
			`${urlApi}/listProduct?category=${category}`
		);
		return response.data;
	}
);

export const { setListProduct, setCurrentPagination } = ProductSlice.actions;

export default ProductSlice.reducer;
