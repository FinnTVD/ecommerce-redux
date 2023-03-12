import React, { useEffect } from "react";
import CardProduct from "./components/CardProduct";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct, getTotalPagination } from "../../store/ProductSlice";
import SkeletonCard from "./components/SkeletonCard";
import PaginationProduct from "./components/Pagination";
import SliderProduct from "./components/SliderProduct";

const arrSkeleton = new Array(6).fill(0);

const ProductPage = () => {
	const { listProduct, isLoading, totalPagination } = useSelector(
		(state) => state.product
	);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchProduct());
		dispatch(getTotalPagination());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{isLoading &&
				arrSkeleton.map((e, index) => <SkeletonCard key={index} />)}
			<div className="mb-10">
				<SliderProduct />
			</div>
			<div className="grid grid-cols-5 gap-x-6 gap-y-10 card-product">
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
	);
};

export default ProductPage;
