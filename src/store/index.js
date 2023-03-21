import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./ProductSlice";
import ShoppingCartSlice from "./ShoppingCartSlice";
import UserSlice from "./UserSlice";

const store = configureStore({
	reducer: {
		product: ProductSlice,
		shoppingCart: ShoppingCartSlice,
		user: UserSlice,
	},
});

export default store;
