import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
	fetchCategory,
	getTotalPagination,
	setCurrentPagination,
} from "../../store/ProductSlice";
import { customArray } from "../../utils/global";
import CardProduct from "./components/CardProduct";
import PaginationProduct from "./components/Pagination";
import SkeletonCard from "./components/SkeletonCard";
import SliderProduct from "./components/SliderProduct";

const Sound = () => {
	const param = useLocation();

	const { listProduct, isLoading, totalPagination, currentPagination } =
		useSelector((state) => state.product);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCategory(param.pathname.slice(1)));
		dispatch(getTotalPagination(`category=${param.pathname.slice(1)}`));
		currentPagination > 1 && dispatch(setCurrentPagination(1));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{isLoading &&
				customArray(6).map((e, index) => <SkeletonCard key={index} />)}
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

export default Sound;
