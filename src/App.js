import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import ConfirmPay from "./pages/PayProduct/ConfirmPay";
import { getToken } from "./utils/auth";
import PaySuccess from "./vnpay/PaySuccess";
import { authRefreshToken } from "./store/AuthSlice";

const HomeLayout = lazy(() => import("./components/HomeLayout"));
const DetailsProduct = lazy(() => import("./pages/DetailsProduct"));
const ShoppingCart = lazy(() => import("./pages/ShoppingCart"));
const ProductPage = lazy(() => import("./pages/Products"));
const PostProduct = lazy(() => import("./pages/PostProduct"));

function App() {
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		if (user && user.id) return;
		const { refresh_token } = getToken();
		if (refresh_token) {
			dispatch(authRefreshToken(refresh_token));
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
						<Route
							path="product/:id?"
							element={<DetailsProduct />}
						/>
						<Route
							path="shopping-cart/"
							element={<ShoppingCart />}
						/>
						<Route path="confirm-pay" element={<ConfirmPay />} />
						<Route path="post-product" element={<PostProduct />} />
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
