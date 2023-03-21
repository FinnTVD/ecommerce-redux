import { Button, Image, Space, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
	getShoppingCart,
	setIsDelete,
	setSelectedRowKeys,
} from "../../../store/ShoppingCartSlice";
import { customArray, urlApi } from "../../../utils/global";
import SkeletonCard from "../../Products/components/SkeletonCard";
import PopConfirmDelete from "./PopConfirmDelete";

const TableShoppingCart = () => {
	const [current, setCurrent] = useState(1);
	const [selected, setSelected] = useState([]);
	const dispatch = useDispatch();
	const {
		shoppingCart,
		isDelete,
		isLoad,
		selectedRowKeys,
		lengthShoppingCart,
	} = useSelector((state) => state.shoppingCart);

	const handleChangePage = (e) => {
		setCurrent(e);
		dispatch(getShoppingCart(e));
	};

	useEffect(() => {
		if (selectedRowKeys.length > 0) {
			let a = [];
			selectedRowKeys.forEach((e) => a.push(e.id));
			setSelected(a);
		}
		dispatch(getShoppingCart());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isDelete]);

	const onSelectChange = (newSelected, selectedRowKeys) => {
		setSelected(newSelected);
		dispatch(setSelectedRowKeys(selectedRowKeys));
	};

	const rowSelection = {
		selectedRowKeys: selected,
		onChange: onSelectChange,
		selections: [Table.SELECTION_ALL, Table.SELECTION_NONE],
	};

	const handleDeleteProduct = async (id) => {
		await axios.delete(`${urlApi}/shoppingCart/${id}`);
		dispatch(setSelectedRowKeys(selectedRowKeys.filter((e) => e != id)));
		dispatch(setIsDelete(!isDelete));
	};

	const columns = [
		{
			title: <p>Tên sản phẩm</p>,
			dataIndex: "name",
			render: (text, { id }) => (
				<Link className="flex justify-start" to={`/product/${id}`}>
					{text}
				</Link>
			),
		},
		{
			title: <p className="text-center">Hình ảnh</p>,
			dataIndex: "avatar",
			render: (src) => (
				<Image
					style={{
						width: "80px",
						height: "80px",
						objectFit: "contain",
					}}
					src={src}
					alt=""
				/>
			),
		},
		{
			title: <p className="text-center">Màu sắc</p>,
			key: "option",
			render: ({ option }) => (
				<span className="font-semibold">{option[0].color}</span>
			),
		},
		{
			title: <p className="text-center">Giá niêm yết</p>,
			dataIndex: "listPrice",
			render: (listPrice) => (
				<span className="text-[#d70018] font-semibold">
					{listPrice.toLocaleString("vi", {
						style: "currency",
						currency: "VND",
					})}
				</span>
			),
		},
		{
			title: <p className="text-center">Giá hiện tại</p>,
			dataIndex: "sale.salePrice",
		},
		{
			title: "Thao Tác",
			key: "action",
			render: (_, record) => (
				<Space size="middle">
					<PopConfirmDelete
						deleteProduct={() => handleDeleteProduct(record.id)}
					>
						<Button type="primary" danger>
							Delete
						</Button>
					</PopConfirmDelete>
				</Space>
			),
		},
	];

	return (
		<>
			{isLoad ? (
				customArray(5).map((e, index) => <SkeletonCard key={index} />)
			) : (
				<Table
					rowKey={(obj) => obj.id}
					rowSelection={rowSelection}
					columns={columns}
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
