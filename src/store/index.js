import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./ProductSlice";
import ShoppingCartSlice from "./ShoppingCartSlice";
import AuthSlice from "./AuthSlice";
import logger from "redux-logger";

const store = configureStore({
	reducer: {
		product: ProductSlice,
		shoppingCart: ShoppingCartSlice,
		auth: AuthSlice,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
