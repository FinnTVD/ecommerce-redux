import React, { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import ConfirmPay from "./pages/PayProduct/ConfirmPay";
import { authRefreshToken, authUpdateUser } from "./store/auth/AuthSlice";
import { getToken } from "./utils/auth";
import PaySuccess from "./vnpay/PaySuccess";

// import AddProduct from "./pages/Admin/Pages/AddProduct";
// import AdminProduct from "./pages/Admin/Pages/AdminProduct";
// import ListProduct from "./pages/Admin/Pages/ListProduct";
// import ListUser from "./pages/Admin/Pages/ListUser";

// const Admin = lazy(() => import("./pages/Admin"));
const HomeLayout = lazy(() => import("./components/HomeLayout"));
const DetailsProduct = lazy(() => import("./pages/DetailsProduct"));
const ShoppingCart = lazy(() => import("./pages/ShoppingCart"));
const ProductPage = lazy(() => import("./pages/Products"));
const SmartPhone = lazy(() => import("./pages/Products/SmartPhone"));
const Laptop = lazy(() => import("./pages/Products/Laptop"));
const Tablet = lazy(() => import("./pages/Products/Tablet"));
const Sound = lazy(() => import("./pages/Products/Sound"));
const Watch = lazy(() => import("./pages/Products/Watch"));

function App() {
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		if (user && user.id) {
			const { access_token } = getToken();
			dispatch(
				authUpdateUser({
					user: user,
					accessToken: access_token,
				})
			);
		} else {
			const { refresh_token } = getToken();
			if (refresh_token) {
				dispatch(authRefreshToken(refresh_token));
			} else {
				dispatch(authUpdateUser({}));
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="App">
			<Suspense fallback={<></>}>
				<Routes>
					<Route path="sign-in" element={<SignIn />} />
					<Route path="sign-up" element={<SignUp />} />
					<Route path="pay-success" element={<PaySuccess />} />
					<Route path="/" element={<HomeLayout />}>
						<Route index element={<ProductPage />} />
						<Route path="smartphone" element={<SmartPhone />} />
						<Route path="tablet" element={<Tablet />} />
						<Route path="laptop" element={<Laptop />} />
						<Route path="watch" element={<Watch />} />
						<Route path="sound" element={<Sound />} />
						<Route
							path="product/:id?"
							element={<DetailsProduct />}
						/>
						<Route
							path="shopping-cart/"
							element={<ShoppingCart />}
						/>
						<Route path="confirm-pay" element={<ConfirmPay />} />
					</Route>
					<Route
						path="*"
						element={
							<h1 className="pt-10 text-3xl font-bold text-center">
								Not Found 404
							</h1>
						}
					/>
				</Routes>
			</Suspense>
		</div>
	);
}

export default App;
