import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./ProductSlice";
import ShoppingCartSlice from "./ShoppingCartSlice";

const store = configureStore({
	reducer: {
		product: ProductSlice,
		shoppingCart: ShoppingCartSlice,
	},
});

export default store;
