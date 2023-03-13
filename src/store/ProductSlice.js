import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
			state.listProduct = action.payload;
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
			state.isLoading = false;
		});
		builder.addCase(fetchCategory.rejected, (state, action) => {
			state.isLoading = false;
			console.log("reject");
		});
		builder.addCase(getTotalPagination.fulfilled, (state, action) => {
			state.totalPagination = action.payload;
		});
	},
});

export const fetchProduct = createAsyncThunk(
	"fetchProduct",
	async (page = 1) => {
		const response = await axios.get(
			`https://api-ecommerce-redux.vercel.app/listProduct?_page=${page}&_limit=10`
		);
		return response.data;
	}
);

export const getTotalPagination = createAsyncThunk(
	"getTotalPagination",
	async (category) => {
		const res = await axios.get(
			`https://api-ecommerce-redux.vercel.app/listProduct?${category}`
		);
		return Math.ceil(res.data.length / 10) * 10;
	}
);

export const fetchCategory = createAsyncThunk(
	"fetchCategory",
	async (category) => {
		const response = await axios.get(
			`https://api-ecommerce-redux.vercel.app/listProduct?category=${category}`
		);
		return response.data;
	}
);

export const { setListProduct, setCurrentPagination } = ProductSlice.actions;

export default ProductSlice.reducer;
