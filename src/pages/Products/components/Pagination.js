import { Pagination } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProduct } from "../../../store/ProductSlice";
const PaginationProduct = ({ total }) => {
	const [current, setCurrent] = useState(1);
	const dispatch = useDispatch();

	const handleChange = (e) => {
		setCurrent(e);
		dispatch(fetchProduct(e));
	};

	return (
		<Pagination onChange={handleChange} current={current} total={total} />
	);
};
export default PaginationProduct;
