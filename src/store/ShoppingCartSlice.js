import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const ShoppingCartSlice = createSlice({
	name: "shoppingcart",
	initialState: {
		shoppingCart: [],
		isAddSuccess: false,
		idParam: 0,
		isDelete: false,
		selectedRowKeys: [],
		cartList: [],
		lengthShoppingCart: 0,
	},
	reducers: {
		setLengthShoppingCart: (state, action) => {
			state.lengthShoppingCart = action.payload;
		},
		setCartList: (state, action) => {
			state.cartList = action.payload;
		},
		setIsAddSuccess: (state, action) => {
			state.isAddSuccess = action.payload;
		},
		setIdParam: (state, action) => {
			state.idParam = action.payload;
		},
		setIsDelete: (state, action) => {
			state.isDelete = action.payload;
		},
		setSelectedRowKeys: (state, action) => {
			state.selectedRowKeys = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getShoppingCart.fulfilled, (state, action) => {
			state.shoppingCart = action.payload;
		});
	},
});

const { reducer, actions } = ShoppingCartSlice;

export const getShoppingCart = createAsyncThunk(
	"getShoppingCart",
	async (page = 1) => {
		const res = await axios.get(
			`http://localhost:3000/shoppingCart?_page=${page}&_limit=5`
		);
		return res.data;
	}
);

export const {
	setLengthShoppingCart,
	setCartList,
	setIsAddSuccess,
	setIdParam,
	setIsDelete,
	setSelectedRowKeys,
} = actions;

export default reducer;
