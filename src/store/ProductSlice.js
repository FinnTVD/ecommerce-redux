import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ProductSlice = createSlice({
	name: "product",
	initialState: {
		listProduct: [],
		isLoading: true,
		totalPagination: 0,
	},
	reducers: {
		setListProduct: (state, action) => {
			state.listProduct = action.payload;
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
			`http://localhost:3000/listProduct?_page=${page}&_limit=10`
		);
		return response.data;
	}
);

export const getTotalPagination = createAsyncThunk(
	"getTotalPagination",
	async () => {
		const res = await axios.get("http://localhost:3000/listProduct");
		const total = (await Math.ceil(res.data.length / 10)) * 10;
		return total;
	}
);

export const fetchCategory = createAsyncThunk(
	"fetchCategory",
	async (category) => {
		const response = await axios.get(
			`http://localhost:3000/listproduct?category=${category}`
		);
		return response.data;
	}
);

export const { setListProduct } = ProductSlice.actions;

export default ProductSlice.reducer;
