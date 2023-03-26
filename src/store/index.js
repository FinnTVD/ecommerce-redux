import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./ProductSlice";
import ShoppingCartSlice from "./ShoppingCartSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import AuthSlice from "./auth/AuthSlice";
import logger from "redux-logger";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
	reducer: {
		product: ProductSlice,
		shoppingCart: ShoppingCartSlice,
		auth: AuthSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(logger, sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
