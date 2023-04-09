import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import CardProduct from "./components/CardProduct";
import { fetchProduct } from "../../store/ProductSlice";
import SkeletonCard from "./components/SkeletonCard";
import PaginationProduct from "./components/Pagination";
import SliderProduct from "./components/SliderProduct";
import { customArray } from "../../utils/global";

const ProductPage = () => {
	const { listProduct, isLoading, totalPagination } = useSelector(
		(state) => state.product
	);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchProduct());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{isLoading ? (
				customArray(6).map((e, index) => <SkeletonCard key={index} />)
			) : (
				<>
					<div className="mb-10 max-sm:mb-6">
						<SliderProduct />
					</div>
					<div className="grid grid-cols-5 max-sm:grid-cols-2 max-sm:gap-x-4 max-md:grid-cols-3 max-lg:gap-x-4 max-lg:grid-cols-4 gap-x-6 gap-y-10 max-sm:gap-y-6 card-product">
						{listProduct.length > 0 &&
							listProduct
								.slice(0, 10)
								.map((e) => (
									<CardProduct
										key={e.id}
										item={e}
										className="card-product"
									></CardProduct>
								))}
					</div>
					<div className="mt-10 text-center">
						<PaginationProduct total={totalPagination} />
					</div>
				</>
			)}
		</>
	);
};

export default ProductPage;
