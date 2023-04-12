import { Suspense, lazy, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { getToken } from "./utils/auth";
import { authRefreshToken } from "./store/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

import Test from "./Test";
import Page404 from "./pages/404";

const SignUp = lazy(() => import("./pages/Auth/SignUp"));
const SignIn = lazy(() => import("./pages/Auth/SignIn"));
const HomeLayout = lazy(() => import("./components/HomeLayout"));
const DetailsProduct = lazy(() => import("./pages/DetailsProduct"));
const ShoppingCart = lazy(() => import("./pages/ShoppingCart"));
const ProductPage = lazy(() => import("./pages/Products"));
const PostProduct = lazy(() => import("./pages/PostProduct"));
const ProfileUser = lazy(() => import("./pages/ProfileUser"));
const ConfirmPay = lazy(() => import("./pages/PayProduct/ConfirmPay"));
const PaySuccess = lazy(() => import("./vnpay/PaySuccess"));

const router = createBrowserRouter([
	{
		path: "sign-in",
		element: <SignIn />,
	},
	{
		path: "sign-up",
		element: <SignUp />,
	},
	{
		path: "pay-success",
		element: <PaySuccess />,
	},
	{
		path: "/",
		element: <HomeLayout />,
		children: [
			{
				index: true,
				element: <ProductPage />,
			},
			{
				path: "product/:id?",
				element: <DetailsProduct />,
			},
			{
				path: "shopping-cart",
				element: <ShoppingCart />,
			},
			{
				path: "confirm-pay",
				element: <ConfirmPay />,
			},
			{
				path: "post-product",
				element: <PostProduct />,
			},
			{
				path: "profile-user",
				element: <ProfileUser />,
			},
			{
				path: "test",
				element: <Test />,
			},
		],
	},
	{
		path: "*",
		element: <Page404 />,
	},
]);

const App = () => {
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
		<div className="App h-screen dark:bg-[#0f172a]">
			<Suspense fallback={<></>}>
				<RouterProvider router={router} />
			</Suspense>
		</div>
	);
};

export default App;
