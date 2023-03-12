import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
// import AddProduct from "./pages/Admin/Pages/AddProduct";
// import AdminProduct from "./pages/Admin/Pages/AdminProduct";
// import ListProduct from "./pages/Admin/Pages/ListProduct";
// import ListUser from "./pages/Admin/Pages/ListUser";
import ProductPage from "./pages/Products/index";

// const Admin = lazy(() => import("./pages/Admin"));
const HomeLayout = lazy(() => import("./components/HomeLayout"));
const DetailsProduct = lazy(() => import("./pages/DetailsProduct"));
const ShoppingCart = lazy(() => import("./pages/ShoppingCart"));

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
						<Route index element={<ProductPage />}></Route>
						<Route
							path="product/:id?"
							element={<DetailsProduct />}
						></Route>
						<Route
							path="shopping-cart"
							element={<ShoppingCart />}
						></Route>
					</Route>
					<Route
						path="*"
						element={
							<h1 className="font-bold text-center text-3xl pt-10">
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
