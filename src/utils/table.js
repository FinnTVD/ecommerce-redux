import { Button, Image, Space } from "antd";
import { Link } from "react-router-dom";
import PopConfirmDelete from "../pages/ShoppingCart/components/PopConfirmDelete";

export const columns = (handleDeleteProduct) => {
	return [
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
			title: <p className="text-center">Thao Tác</p>,
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
};

export const columnsMobile = (handleDeleteProduct) => {
	return [
		{
			title: <p className="text-center">Hình ảnh</p>,
			dataIndex: "avatar",
			render: (src) => (
				<Image
					style={{
						width: "60px",
						height: "60px",
						objectFit: "contain",
					}}
					src={src}
					alt=""
				/>
			),
		},
		{
			title: <p className="text-center">Thông tin sản phẩm</p>,
			dataIndex: "name",
			render: (text, { id, option, listPrice }) => (
				<div className="flex flex-col justify-center items-center">
					<Link className="flex justify-start" to={`/product/${id}`}>
						{text}
					</Link>
					<span className="font-semibold">Màu:{option[0].color}</span>
					<span className="text-[#d70018] font-semibold">
						{listPrice.toLocaleString("vi", {
							style: "currency",
							currency: "VND",
						})}
					</span>
					<Space size="middle">
						<PopConfirmDelete
							deleteProduct={() => handleDeleteProduct(id)}
						>
							<Button type="primary" danger>
								Delete
							</Button>
						</PopConfirmDelete>
					</Space>
				</div>
			),
		},
	];
};
