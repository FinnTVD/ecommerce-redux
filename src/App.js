import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// import AddProduct from "./pages/Admin/Pages/AddProduct";
// import AdminProduct from "./pages/Admin/Pages/AdminProduct";
// import ListProduct from "./pages/Admin/Pages/ListProduct";
// import ListUser from "./pages/Admin/Pages/ListUser";

// const Admin = lazy(() => import("./pages/Admin"));
const HomeLayout = lazy(() => import("./components/HomeLayout"));
const DetailsProduct = lazy(() => import("./pages/DetailsProduct"));
const ShoppingCart = lazy(() => import("./pages/ShoppingCart"));
const ProductPage = lazy(() => import("./pages/Products/index"));
const SmartPhone = lazy(() => import("./pages/Products/SmartPhone"));
const Laptop = lazy(() => import("./pages/Products/Laptop"));
const Tablet = lazy(() => import("./pages/Products/Tablet"));
const Sound = lazy(() => import("./pages/Products/Sound"));
const Watch = lazy(() => import("./pages/Products/Watch"));

function App() {
	return (
		<div className="App">
			<Suspense fallback={<></>}>
				<Routes>
					{/* <Route path="/" element={<Admin />}>
						<Route element={<AdminProduct />}>
							<Route index element={<ListProduct />}></Route>
							<Route
								path="add-product"
								element={<AddProduct />}
							></Route>
						</Route>
						<Route path="users" element={<ListUser />}></Route>
					</Route> */}
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
							path="shopping-cart"
							element={<ShoppingCart />}
						/>
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
