import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import {
	getShoppingCart,
	setIsDelete,
	setSelectedRowKeys,
} from "../../../store/ShoppingCartSlice";
import { customArray, urlApi } from "../../../utils/global";
import SkeletonCard from "../../Products/components/SkeletonCard";

import { Table } from "antd";
import { columns, columnsMobile } from "../../../utils/table";
import useResize from "../../../hooks/useResize";

const TableShoppingCart = () => {
	const [current, setCurrent] = useState(1);
	const [selected, setSelected] = useState([]);
	const widthScreen = useResize();
	const dispatch = useDispatch();
	const {
		shoppingCart,
		isDelete,
		isLoad,
		selectedRowKeys,
		lengthShoppingCart,
	} = useSelector((state) => state.shoppingCart);

	useEffect(() => {
		if (selectedRowKeys.length > 0) {
			let a = [];
			selectedRowKeys.forEach((e) => a.push(e.id));
			setSelected(a);
		}
		dispatch(getShoppingCart());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isDelete]);

	const handleChangePage = (e) => {
		setCurrent(e);
		dispatch(getShoppingCart(e));
	};

	const onSelectChange = (newSelected, selectedRowKeys) => {
		setSelected(newSelected);
		dispatch(setSelectedRowKeys(selectedRowKeys));
	};

	const handleDeleteProduct = async (id) => {
		await axios.delete(`${urlApi}/shoppingCart/${id}`);
		dispatch(setSelectedRowKeys(selectedRowKeys.filter((e) => e != id)));
		dispatch(setIsDelete(!isDelete));
	};

	return (
		<>
			{isLoad ? (
				customArray(5).map((e, index) => <SkeletonCard key={index} />)
			) : (
				<Table
					rowKey={(obj) => obj.id}
					rowSelection={{
						selectedRowKeys: selected,
						onChange: onSelectChange,
						selections: [Table.SELECTION_ALL, Table.SELECTION_NONE],
					}}
					columns={
						widthScreen < 1024
							? columnsMobile(handleDeleteProduct)
							: columns(handleDeleteProduct)
					}
					dataSource={shoppingCart}
					pagination={{
						total: Math.ceil(lengthShoppingCart / 5) * 10,
						current,
						onChange: handleChangePage,
					}}
				/>
			)}
		</>
	);
};
export default TableShoppingCart;
